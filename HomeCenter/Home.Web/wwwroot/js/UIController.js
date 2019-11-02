/**
 * UIController class for, you guessed it: Controlling
 * UI!
 */

class UIController {
    /**
     * Creates instance of the UIController class
     * @param givenItem
     */
    constructor(givenItem){
        this.selectedItem = givenItem;
        this.currentIndex = 0;
    }
    //mvoe methods by getting input
    //use uiitem parent/child props to figure out wherer to move
    // this.selectedItem.parent.getStackDirection() returns string 'vstack' or 'hstack'
    //if parent is null its the root- dont go beyond   
    
    moveDown() {
        if (this.selectedItem.parent.getStackDirection() === 'vstack' && this.currentIndex < this.selectedItem.parent.children.length - 1) {
            this.currentIndex++;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        } 
        else if (this.selectedItem.parent.getStackDirection() === 'hstack') {
            
        }
    }
    
    moveUp() {
        if (this.selectedItem.parent.getStackDirection() === 'vstack' && this.currentIndex > 0) {
            this.currentIndex--;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        }
    }
    
    moveRight() {
        if (this.selectedItem.parent.getStackDirection() === 'hstack' && this.currentIndex < this.selectedItem.parent.children.length - 1) {
            this.currentIndex++;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        }
    }
    
    moveLeft() {
        if (this.selectedItem.parent.getStackDirection() === 'hstack' && this.currentIndex > 0) {
            this.currentIndex--;
            this.selectedItem = this.selectedItem.parent.children[this.currentIndex];
        }
    }
}