import { Server, Socket } from "socket.io";
import v1 from "uuid/v1";

export class SocketServer {

    public clients: Map<string, SocketUser>;

    public io : Server;

    constructor(ioServer: Server) {
        this.clients = new Map<string, SocketUser>();
        this.io = ioServer;

        this.onConnectionSocket();
    }

    private onConnectionSocket() : void
    {
        this.io.on("connection", (socket: Socket) => {

            this.clients.set(socket.id, new SocketUser(socket))

            this.onCodeRequest(socket);
            this.onControlInput(socket);
            this.onDisconnect(socket);

        });
    }

    /**
     * Removes a connected client from the socket server
     * @param socket 
     */
    private onDisconnect(socket : Socket) :void
    {
        socket.on("disconnect", () => {

            if(this.clients.has(socket.id))
                this.clients.delete(socket.id);

        });
    }


    private onControlInput(socket: Socket): void
    {
        socket.on("/controlInput", (message: InputState) => {
            if(this.clients.has(socket.id))
                if(this.clients.get(socket.id).authorized)
                    this.controlRelay(message);
        });
    }

    private onCodeRequest(socket: Socket): void
    {
        socket.on("/accessCodeInput", (message: string) => {

                if (this.clients.has(socket.id))
                    this.clients.get(socket.id).authorized = true;
        });
    }

    private controlRelay(message: InputState) : void
    {
        this.io.emit("/recieveControlInput", message);
    }

}

class SocketUser
{
    public socket : Socket;

    public authorized : boolean;

    constructor(givenSocket: Socket) {
        this.socket = givenSocket;
        this.authorized = false;
    }
}