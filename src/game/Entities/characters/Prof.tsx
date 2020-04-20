import Npc from './Npc';
import profSpriteImage from '../../images/profSprite.jpg';
import SpritePosition from '../../SpritePosition';

export default class Prof extends Npc {
    
    constructor(xPos:number, yPos:number) {

        let spriteMap = new Image();
        spriteMap.src = profSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 32;
        let xVelocity = 1.5;
        let xVelocityJump = 1;
        let yVelocity = 25;
        let friction = 0.8; //TODO probably move friction to TileTypes
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction);
    }

    //TODO some kind of "Artificial Intelligence" for moving around

}