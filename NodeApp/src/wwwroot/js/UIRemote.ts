
class UIRemote
{

    public socket : SocketIOClient.Socket;

    public uiController : UIController;

    public remoteMode : boolean;

    constructor(mode : boolean = true) {
        this.socket = io.connect();
        this.remoteMode = mode;


        if(this.remoteMode)
        {//we are in recieving mode
            this.uiController = UIController.BuildUI();
            this.recieveControl();
            document.onkeydown = this.checkKey;

        }
        else
        {//we are in sending mode
            this.sendControl();
        }
    }

    public recieveControl() :void
    {
        this.socket.on("/recieveControlInput", (message :any) => {

            this.uiController.unHighlight();

            switch(message)
            {
                case InputState.Up:
                    this.uiController.up();
                break;
                case InputState.Right:
                    this.uiController.right();
                break;
                case InputState.Down:
                    this.uiController.down();
                break;
                case InputState.Left:
                    this.uiController.left();
                break;
                case InputState.Back:
                    this.uiController.escape();
                break;
                case InputState.Enter:
                    this.uiController.enter();
                break;
                default: 
                    console.log(message);
                    break;
            }

            this.uiController.highlight()

        });
    }

    public sendControl() : void
    {
        
        //register button events
         document.querySelectorAll("button[data-ui-control]").forEach(x => {
             x.addEventListener("click",(e) => {
                let button : HTMLElement = e.target as HTMLElement;

                switch(button.dataset.uiControl)
                {
                    case "Up":
                        this.socket.emit("/controlInput", InputState.Up);
                        break;
                    case "Right":
                        this.socket.emit("/controlInput", InputState.Right);
                        break;
                    case "Down":
                        this.socket.emit("/controlInput", InputState.Down);
                        break;
                    case "Left":
                        this.socket.emit("/controlInput", InputState.Left);
                        break;
                    case "Enter":
                        this.socket.emit("/controlInput", InputState.Enter);
                        break;
                    case "Back":
                        this.socket.emit("/controlInput", InputState.Back);
                        break;

                }
             });
         });
    }

    private checkKey(e : any): void {//For debug

        e.preventDefault();
        
        this.uiController.unHighlight();
        
        if (e.keyCode === 38)
            this.uiController.up();
        else if (e.keyCode === 40) 
            this.uiController.down();
        else if (e.keyCode === 37) 
            this.uiController.left();
        else if (e.keyCode === 39) 
            this.uiController.right();
        else if(e.keyCode === 13)
            this.uiController.enter();
        else if(e.keyCode === 27)
            this.uiController.escape();
        
        this.uiController.highlight();
    }

}

enum InputState
{
    Up,
    Right,
    Down,
    Left,
    Back,
    Enter,
    None
}




// let ui = UIController.BuildUI();