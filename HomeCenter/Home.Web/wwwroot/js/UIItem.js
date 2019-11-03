
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
        givenUIItem.parent = this;
        this.children.push(givenUIItem);
    }

    /**
     * Gets the stack direction from the elements data attribute
     * @returns {string}
     */
    getStackDirection()
    {
        
        return this.htmlElement.dataset.uiStack;
    }
    
}
