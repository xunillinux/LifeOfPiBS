import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";
import projectileSpriteImage from '../../images/projectileSpriteImage.jpg';
import Map from "../../Map/Map";
import MapTile from "../../Map/MapTile";
import Character from "../characters/Character";
import Sound, { Sounds } from "../../soundfx/Sound";

export enum ProjectileDirection{
    UP,
    LEFT,
    RIGHT
}

export default class Projectile extends Entity{
    private _hasCollided: boolean;
    private _xSpeed: number;
    private _ySpeed: number;
    private _range: number;
    private startXPos: number;
    private startYPos: number;
    private _owner: Character;
    
    private static spritePattern = "loremipsumdolorsitamet";
    private static currentPatternIndex = 0;
    
    constructor(xPos:number, yPos:number, _projectileDirection: ProjectileDirection, owner: Character) {
        let spriteMap = new Image();
        spriteMap.src = projectileSpriteImage;
        let spritePos = Projectile.getNextSpritePosition();
        let sourceSize = 16;
        let targetSize = 16;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
        this._xSpeed = _projectileDirection === ProjectileDirection.RIGHT ? 15 : 0;
        this._xSpeed = _projectileDirection === ProjectileDirection.LEFT ? -15 : this._xSpeed;
        this._ySpeed = _projectileDirection === ProjectileDirection.UP ? 15 : 0;
        this._hasCollided = false;
        this.startXPos = 0;
        this.startYPos = 0;
        this._range = 10 * MapTile.targetSize;
        this._owner = owner;
        Sound.playSound(Sounds.SHOOT);
    }

    public get hasCollided(): boolean {
        return this._hasCollided;
    }
    public set hasCollided(value: boolean) {
        this._hasCollided = value;
    }

    public updatePos(xPos: number, yPos: number){
        this.startXPos = xPos;
        this.startYPos = yPos;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public animate(ticks:number){}

    public move(){
        this.xPos += this._xSpeed;
        this.yPos -= this._ySpeed;
    }

    public handleLevelEdgeCollision(map: Map){

        if (this.xPos < 0 || this.xPos > map.mapWidth) {
            this._hasCollided = true;
        }
        if(this.yPos < 0 || this.yPos > map.mapHeight){
            this._hasCollided = true;
        }

    }

    public fellOutOfMap(){
        this._hasCollided = true;
    }

    public shouldBeDestroyed(){
        return (this.hasCollided || this.reachedRangeLimit());
    }

    private reachedRangeLimit(){
        return (Math.abs(this.xPos - this.startXPos) > this._range || Math.abs(this.yPos - this.startYPos) > this._range);
    }

    private static getNextSpritePosition(){
        let spritePosition = Projectile.getSpritePositionForLetter(Projectile.spritePattern.charAt(Projectile.currentPatternIndex));
        Projectile.currentPatternIndex = (Projectile.currentPatternIndex >= Projectile.spritePattern.length-1) ? 0 : Projectile.currentPatternIndex+1;
        return spritePosition;
    }

    private static getSpritePositionForLetter(l: string){

        let relativeCharCode = l.toUpperCase().charCodeAt(0) - 65; //A-Z -> 65 - 90 in ascii table
        return new SpritePosition(relativeCharCode, 0);

    }

    public get owner(): Character {
        return this._owner;
    }
    
}