/**
 * UIController class for, you guessed it: Controlling
 * UI!
 */

class UIController {

    public ui : UIItem;

    public selectedItem : UIItem;

    public currentIndex : number; 

    public parentIndex : number;

    /**
     * Creates instance of the UIController class
     */
    constructor(givenRootContainer : UIItem){
        this.ui = givenRootContainer;
        
        this.selectedItem = this.getFirstNonContainer(this.ui);
        this.currentIndex = 0;
        this.parentIndex = 0;
        
        this.highlight();//highlight first selected element
    }
 
    
    public getFirstNonContainer(uiItem: UIItem) : UIItem   
    {
        let currentUIItem = uiItem;
        
        while(currentUIItem.children.length !== 0)
        {
            currentUIItem = currentUIItem.children[0];
        }
        return currentUIItem;
    }
    
    public highlight() : void
    {
        this.selectedItem.htmlElement.classList.add('highlight');
    }

    public unHighlight() : void
    {
        this.selectedItem.htmlElement.classList.remove('highlight');
    }
    
    public increase() : void
    {
        
        if(!this.selectedItem.parent)
            return;

        if (this.selectedItem.parent.children.length - 1 > this.currentIndex) 
        {
            this.currentIndex++;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        } else
        {
            this.currentIndex = 0;
        }

            
    }
    
    public decrease() : void
    {
        if(!this.selectedItem.parent)
            return;

        if (this.currentIndex > 0)
        {
            this.currentIndex--;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        } else
        {
            this.currentIndex = 0;
        }
    }
    
    public up() : void
    {
        if(!this.selectedItem.parent)
            return;
        
        if(this.selectedItem.parent.getStackDirection() === "vstack")
        {
            this.decrease();
        }
        else
        {
            this.escape();
            this.decrease();
        }
    }
    
    public down() : void
    {
        if(!this.selectedItem.parent)
            return;
        
        if(this.selectedItem.parent.getStackDirection() === "vstack")
        {
            this.increase();
        }
        else
        {
            this.escape();
            this.increase();
        }
    }
    
    public left() : void
    {
        if(!this.selectedItem.parent)
            return;

        if (this.selectedItem.parent.getStackDirection() === "hstack") {//if its an hstack


            if (this.currentIndex === 0)
            {
                this.escape();

                //if we enter a vstack then move to the right one
                if(!this.selectedItem.parent)//TODO probably move into escape
                    return;

                if(this.selectedItem.parent.getStackDirection() === "vstack"){
                    this.escape();
                    this.decrease();
                }else{
                    this.decrease();
                }

            } else{
                this.decrease();
            }
        }
        else { //if its a vstack
            this.escape();
            this.decrease();
        }
    }
    
    public right() : void
    {
        if(!this.selectedItem.parent)
            return;
        
        if (this.selectedItem.parent.getStackDirection() === "hstack") {//if its an hstack
            
            
            if (this.selectedItem.parent.children.length - 1 === this.currentIndex) 
            {
                this.escape();
                
                //if we enter a vstack then move to the right one
                if(!this.selectedItem.parent)//TODO probably move into escape
                    return;
                
                if(this.selectedItem.parent.getStackDirection() === "vstack"){
                    this.escape();
                    this.increase();
                }else{

                    this.increase();
                }
                
            } else{
                this.increase();
            }
        }
        else { //if its a vstack
            this.escape();
            this.increase();
        }
    }
  
    public enter() : void
    {
        if(this.selectedItem.children.length === 0)
            return;
        
        this.parentIndex = this.currentIndex;
        
        this.currentIndex = 0;

        this.selectedItem = this.selectedItem.children[0];
    }
    
    public escape() : void
    {
        if(!this.selectedItem.parent)
            return;
        
        // if (this.selectedItem.parent.children.length - 1 > this.currentIndex) {
            this.currentIndex = this.parentIndex;
        // } else {
        //     this.currentIndex = 0;
        //     this.parentIndex = 0;
        // }

        this.selectedItem = this.selectedItem.parent;
    }
    
    public static BuildUI() : UIController
    {
        let rootHtmlNode : HTMLElement = document.querySelector("div[data-ui-root]");
        
        return new UIController(UIController.BuildUIRecursive(rootHtmlNode));
    }

    public static BuildUIRecursive(givenHtmlItem : HTMLElement) : UIItem
    {
        
        let newUIItem : UIItem = new UIItem(givenHtmlItem);

        
        givenHtmlItem.querySelectorAll(":scope > div").forEach((htmlChildItem : Element) => {
            
            let item : HTMLElement = htmlChildItem as HTMLElement;

            if(item.dataset.uiStack) 
                newUIItem.addChild(UIController.BuildUIRecursive(item));
            else
                newUIItem.addChild(new UIItem(item));
                
        });

        return newUIItem;
    }
}


