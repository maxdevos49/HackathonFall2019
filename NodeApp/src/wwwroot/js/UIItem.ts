
/**
 * Represents a UI element for the home center system
 * @property children
 * @property parent
 */
class UIItem
{

    public htmlElement : HTMLElement;

    public children : UIItem[];

    public parent : UIItem;

    constructor(givenElement : HTMLElement)
    {
        this.htmlElement = givenElement;
        this.children = [];
        this.parent = null;
    }

    /**
     * Adds a child to the UIItem
     * @param givenUIItem
     */
    addChild(givenUIItem : UIItem)
    {
        givenUIItem.parent = this;
        this.children.push(givenUIItem);
    }

    /**
     * Gets the stack direction from the elements data attribute
     * @returns {string}
     */
    public getStackDirection() : string
    {
        return this.htmlElement.dataset.uiStack;
    }
    
}
