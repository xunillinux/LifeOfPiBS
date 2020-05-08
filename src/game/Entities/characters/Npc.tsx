import Character from './Character';
import SpritePosition from '../../SpritePosition';
import ICollisionObject from '../../Collision/ICollisionObject';
import Map from '../../Map/Map';

export default class Npc extends Character implements ICollisionObject{

    private _speedLimitY: number;

    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, xVelocity:number, xVelocityJump: number, yVelocity:number, speedLimitY:number, friction:number, lives:number, collision: boolean) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, lives, collision);
        this._speedLimitY = speedLimitY;
    }

    public fellOutOfMap(){
        this.kill();
    }

    public animate(ticks: number){}

    public move(map: Map){}

    public applyGravity(gravity:number){}

    public switchDirection(){}

    public handleLevelEdgeCollision(map: Map){
        if (this.xPos < 0) {
            this.xPos = 0;
            this.switchDirection();
        }
        else if (this.xPos + this.targetSize > map.mapWidth) {
            this.xPos = map.mapWidth - this.targetSize;
            this.switchDirection();
        }
    }

    protected get speedLimitY(): number {
        return this._speedLimitY;
    }
    protected set speedLimitY(value: number) {
        this._speedLimitY = value;
    }

}