
class Controls {

    static heldLeft: boolean = false;
    static heldRight: boolean = false;
    static heldUp: boolean = false;
    static heldDown: boolean = false;
    static Escape: boolean = false;
    static heldE: boolean = false;

    static registerKeyEvents(){
        window.onkeydown = function (e: any) {
            switch (e.keyCode) {
                case 37: // left
                    e.preventDefault();
                    Controls.heldLeft = true;
                    break;
                case 32: // space
                    e.preventDefault();
                    Controls.heldUp = true;
                    break;
                case 38: // up
                    e.preventDefault();
                    Controls.heldUp = true;
                    break;
                case 39: // right
                    e.preventDefault();
                    Controls.heldRight = true;
                    break;
                case 40: // down
                    e.preventDefault();
                    Controls.heldDown = true;
                    break;
                case 27: // escape
                    e.preventDefault();
                    Controls.Escape = true;
                    break;
                case 69: // E
                    e.preventDefault();
                    Controls.heldE = true;
                    break;
                default:
                    return;
            }
            return false;
        };
    
        window.onkeyup = function (e: any) {
            switch (e.keyCode) {
                case 37: // left
                    e.preventDefault();
                    Controls.heldLeft = false;
                    break;
                case 32: // space
                    e.preventDefault();
                    Controls.heldUp = false;
                    break;
                case 38: // up
                    e.preventDefault();
                    Controls.heldUp = false;
                    break;
                case 39: // right
                    e.preventDefault();
                    Controls.heldRight = false;
                    break;
                case 40: // down
                    e.preventDefault();
                    Controls.heldDown = false;
                    break;
                case 69: // e
                    e.preventDefault();
                    Controls.heldE = false;
                    break;
                default:
                    return;
            }
            return false;
        }
    }

}

export default Controls;