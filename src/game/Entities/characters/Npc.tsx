import Character from './Character';
import SpritePosition from '../../SpritePosition';

class Npc extends Character {

    constructor(xPos:number, yPos:number, sprite_pos:any, xVelocity:number, yVelocity:number, tilePos?:SpritePosition) {
        let friction = 0.8;
        super(xPos, yPos, sprite_pos, xVelocity, yVelocity, friction, tilePos);
    }

}

export default Npc;