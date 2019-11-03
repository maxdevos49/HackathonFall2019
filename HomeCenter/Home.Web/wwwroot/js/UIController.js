/**
 * UIController class for, you guessed it: Controlling
 * UI!
 */

class UIController {
    /**
     * Creates instance of the UIController class
     */
    constructor(givenRootContainer){
        this.ui = givenRootContainer;
        
        this.selectedItem = this.getFirstNonContainer(this.ui);
        this.currentIndex = 0;
        this.parentIndex = 0;
        
        this.highlight();//highlight first selected element
    }
    //mvoe methods by getting input
    //use uiitem parent/child props to figure out wherer to move
    // this.selectedItem.parent.getStackDirection() returns string 'vstack' or 'hstack'
    //if parent is null its the root- dont go beyond   
    
    getFirstNonContainer(uiItem)
    {
        let currentUIItem = uiItem;
        
        while(currentUIItem.children.length !== 0)
        {
            currentUIItem = currentUIItem.children[0];
        }
        return currentUIItem;
    }
    
    highlight()
    {
        this.selectedItem.htmlElement.classList.add('highlight');
    }

    unHighlight()
    {
        this.selectedItem.htmlElement.classList.remove('highlight');
    }
    
    increase()
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
    
    decrease()
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
        
        // if (this.currentIndex > 0) {
        //     this.currentIndex--;
        //     this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        // }
    }
    
    up()
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
    
    down()
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
    
    left()
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
    
    right()
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
  
    enter()
    {
        if(this.selectedItem.children.length === 0)
            return;
        
        this.parentIndex = this.currentIndex;
        
        this.currentIndex = 0;

        this.selectedItem = this.selectedItem.children[0];
    }
    
    escape()
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
    
    static BuildUI()
    {
        let rootHtmlNode = document.querySelector("div[data-ui-root]");
        
        return new UIController(UIController.BuildUIRecursive(rootHtmlNode, null));
    }

    static BuildUIRecursive(givenHtmlItem)
    {
        
        let newUIItem = new UIItem(givenHtmlItem);

        givenHtmlItem.querySelectorAll(":scope > div").forEach((htmlChildItem) => {

            if(htmlChildItem.dataset.uiStack) 
                newUIItem.addChild(UIController.BuildUIRecursive(htmlChildItem));
            else
                newUIItem.addChild(new UIItem(htmlChildItem));
                
        });

        return newUIItem;
    }
}


function checkKey(e) {

    e.preventDefault();
    
    ui.unHighlight();
    
    if (e.keyCode === 38)
        ui.up();
    else if (e.keyCode === 40) 
        ui.down();
    else if (e.keyCode === 37) 
        ui.left();
    else if (e.keyCode === 39) 
        ui.right();
    else if(e.keyCode === 13)
        ui.enter();
    else if(e.keyCode === 27)
        ui.escape();
    
    ui.highlight();

}

let ui = UIController.BuildUI();
document.onkeydown = checkKey;
