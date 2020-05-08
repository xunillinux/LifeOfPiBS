import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";
import projectileSpriteImage from '../../images/projectileSpriteImage.jpg';

export default class Projectile extends Entity{
    private _hasCollided: boolean;
    private _xSpeed: number;
    
    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, _directionRight: boolean) {
        let spriteMap = new Image();
        spriteMap.src = projectileSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 16;
        let targetSize = 32;
        let collision = true; 
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
        this._xSpeed = _directionRight ? 15 : -15;
        this._hasCollided = false;
    }


    public get hasCollided(): boolean {
        return this._hasCollided;
    }
    public set hasCollided(value: boolean) {
        this._hasCollided = value;
    }

    public updatePos(xPos: number, yPos: number){
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public animate(ticks:number){}

    public move(){
        this.xPos += this._xSpeed;
    }

    public handleLevelEdgeCollision(){
        this._hasCollided = true;
    }

    public fellOutOfMap(){
        this._hasCollided = true;
    }


}