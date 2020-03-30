
class Controls {

    static heldLeft: boolean = false;
    static heldRight: boolean = false;
    static heldUp: boolean = false;
    static heldDown: boolean = false;

    constructor() {

    }

    static registerKeyEvents(){
        window.onkeydown = function (e: any) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37: // left
                    Controls.heldLeft = true;
                    break;
                case 32: // space
                    Controls.heldUp = true;
                    break;
                case 38: // up
                    Controls.heldUp = true;
                    break;
                case 39: // right
                    Controls.heldRight = true;
                    break;
                case 40: // down
                    Controls.heldDown = true;
                    break;
                case 27: // escape
                    // TODO initGame()
                default:
                    return;
            }
            return false;
        };
    
        window.onkeyup = function (e: any) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37: // left
                    Controls.heldLeft = false;
                    break;
                case 32: // space
                    Controls.heldUp = false;
                    break;
                case 38: // up
                    Controls.heldUp = false;
                    break;
                case 39: // right
                    Controls.heldRight = false;
                    break;
                case 40: // down
                    Controls.heldDown = false;
                    break;
                default:
                    return;
            }
            return false;
        }
    }

}

export default Controls;