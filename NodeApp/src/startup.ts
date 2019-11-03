import express from "express";
import mongoose from "mongoose";
import http from "http";
import bodyParser from "body-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import useragent from 'express-useragent';
import {SocketServer} from "./sockets/socketServer"
import io from "socket.io";

//controllers
import homeController from "./controllers/HomeController";

import "./helpers/vash/helpers";
import { config } from "./config";

const router: express.Router = express.Router();

export function startup(server: http.Server) {

    //setup database connection
    mongoose.connect(config.database.dbUrl, { useNewUrlParser: true });

    //middleware
    router.use(useragent.express());
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

    //Session
    router.use(session({
        secret: config.session.secret,
        resave: true,
        saveUninitialized: false
    }));

    let ioServer = io(server);
    new SocketServer(ioServer);


    //web page controllers
    router.use("/Home", homeController);

    //redirect to a known route for the home controller
    router.get("/", (req: express.Request, res: express.Response) => {
        res.redirect("/Home/");
    });

    //respond with a 404 request if the document was not found
    router.use((req: express.Request, res: express.Response) => {
        res.status(404);
        res.render("Shared/404", {url: `${config.server.transport}://${config.server.domain}:${config.server.port}${req.url}`});
    });

    return router;
}
