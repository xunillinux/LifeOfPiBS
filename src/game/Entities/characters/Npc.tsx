import Character from './Character';
import SpritePosition from '../../SpritePosition';
import ICollisionObject from '../../Collision/ICollisionObject';

export default class Npc extends Character implements ICollisionObject{

    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, xVelocity:number, xVelocityJump: number, yVelocity:number, lives:number, collision: boolean) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, lives, collision);
    }

    public fellOutOfMap(){
        this.kill();
    }

}