import Character from './Character';

class Npc extends Character {

    constructor(xPos:number, yPos:number, sprite_pos:any, xVelocity:number, yVelocity:number) {
        let friction = 0.8;
        super(xPos, yPos, sprite_pos, xVelocity, yVelocity, friction);
    }

}

export default Npc;