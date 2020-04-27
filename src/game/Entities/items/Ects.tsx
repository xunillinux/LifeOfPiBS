import Item from './Item';
import SpritePosition from '../../SpritePosition';
import ectsSpriteImage from '../../images/ectsSprite.jpg';

class Ects extends Item{

    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = ectsSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 16;
        let targetSize = 32;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
    }

}

export default Ects;