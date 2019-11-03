import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { View } from "../helpers/vash/view";


/**
 * GET:/index
 */
router.get("/index", (req: Request, res: Response) => {
    res.render("Home/index", View(res));
});

/**
 * GET:/index
 */
router.get("/", (req: Request, res: Response) => {
    res.render("Home/index", View(res));
});

/**
 * GET:/control
 */
router.get("/control", (req: Request, res: Response) => {
    res.render("Home/control", View(res));
});


export default router;
