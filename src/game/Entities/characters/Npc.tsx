import Character from './Character';
import SpritePosition from '../../SpritePosition';

export default class Npc extends Character {

    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, xVelocity:number, xVelocityJump: number, yVelocity:number, friction:number, lives:number, collision: boolean) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, lives, collision);
    }

    public fellOutOfMap(){
        this.kill();
    }

}