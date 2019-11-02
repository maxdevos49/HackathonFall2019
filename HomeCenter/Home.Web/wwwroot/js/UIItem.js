
/**
 * Represents a UI element for the home center system
 * @property children
 * @property parent
 */
class UIItem
{
    constructor(givenElement)
    {
        this.htmlElement = givenElement;
        
        this.children = [];
        this.parent = null;
    }

    /**
     * Adds a child to the UIItem
     * @param givenUIItem
     */
    addChild(givenUIItem)
    {
        this.children.push(givenUIItem);
    }

    /**
     * Removes a child from the children list
     * @param givenIndex
     */
    removeChild(givenIndex)
    {
        if(givenIndex < 0)
            return;
        
        if(givenIndex > this.children.length - 1)
            return;
        
        this.children.splice(givenIndex);
    }

    /**
     * Gets the stack direction from the elements data attribute
     * @returns {string}
     */
    getStackDirection()
    {
        return this.htmlElement.dataset.stack;
    }
    
}

function BuildUI(givenContainerRoot)
{
    let uiContainer = new UIItem(rootHtml);

    givenContainerRoot.querySelectorAll("div").forEach((item, index) => {
       
        if(item.dataset.uiStack) {
            uiContainer.addChild(BuildUI(item));
        } else {
            let newUIItem = new UIItem(item);
            newUIItem.parent = uiContainer;
            uiContainer.addChild(newUIItem);
        }
    });
    
    return uiContainer;
    
}

let rootHtml = document.querySelector("div[data-ui-root]");
console.log(BuildUI(rootHtml));