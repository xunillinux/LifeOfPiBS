import Npc from './Npc';
import playerSpriteImage from '../../images/playerSprite.jpg';
import TilePosition from '../../SpritePosition';

class Prof extends Npc {
    

    constructor(xPos:number, yPos:number, tilePos?:TilePosition) {
        let xVelocity = 1.5;
        let yVelocity = 25;
        let sprite_pos = 0;
        const profSizeTarget: any = {w: 32, h: 32};
        super(xPos, yPos, sprite_pos, xVelocity, yVelocity);
        this.spriteMap.src = playerSpriteImage;
        if(tilePos){
            this.xPos = tilePos.getXPosForSpriteWidth(profSizeTarget.w);
            this.yPos = tilePos.getYPosForSpriteHeight(profSizeTarget.h);
        }
    }

}

export default Prof;