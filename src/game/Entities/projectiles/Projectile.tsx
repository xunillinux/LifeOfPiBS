import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";
import projectileSpriteImage from '../../images/projectileSpriteImage.jpg';
import Map from "../../Map/Map";
import MapTile from "../../Map/MapTile";

export default class Projectile extends Entity{
    private _hasCollided: boolean;
    private _xSpeed: number;
    private _range: number;
    private startXPos: number;
    
    constructor(xPos:number, yPos:number, _directionRight: boolean) {
        let spriteMap = new Image();
        spriteMap.src = projectileSpriteImage;
        let spritePos = new SpritePosition(Projectile.getRandomSpriteX(),0);
        let sourceSize = 16;
        let targetSize = 16;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
        this._xSpeed = _directionRight ? 15 : -15;
        this._hasCollided = false;
        this.startXPos = 0;
        this._range = 10 * MapTile.targetSize;
    }

    public get hasCollided(): boolean {
        return this._hasCollided;
    }
    public set hasCollided(value: boolean) {
        this._hasCollided = value;
    }

    public updatePos(xPos: number, yPos: number){
        this.startXPos = xPos;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public animate(ticks:number){}

    public move(){
        this.xPos += this._xSpeed;
    }

    public handleLevelEdgeCollision(map: Map){

        if (this.xPos < 0 || this.xPos > map.mapWidth) {
            this._hasCollided = true;
        }

    }

    public fellOutOfMap(){
        this._hasCollided = true;
    }

    public shouldBeDestroyed(){
        return (this.hasCollided || this.reachedRangeLimit());
    }

    public static getRandomSpriteX(){
        return Math.floor(Math.random() * (4 - 0)) + 0;
    }

    private reachedRangeLimit(){
        return (Math.abs(this.xPos - this.startXPos) > this._range);
    }


}