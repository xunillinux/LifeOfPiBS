import Character from './Character';
import playerSpriteImage from '../../images/playerSprite.jpg';
import SpritePosition from '../../SpritePosition';

export default class Player extends Character {

    private _lives: number;
    private _speedLimitY: number;
    
    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = playerSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 42;
        let xVelocity = 1.5;
        let yVelocity = 25;
        let friction = 0.8; //TODO probably move friction to TileTypes
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, yVelocity, friction);
        this._lives = 3;
        this._speedLimitY = 25;
    }

    resetPlayer() {
        this.lives = 3;
        this.xPos = 0;
        this.yPos = 0;
    }

    public get lives(): number {
        return this._lives;
    }
    public set lives(value: number) {
        this._lives = value;
    }

    public get speedLimitY(): number {
        return this._speedLimitY;
    }
    public set speedLimitY(value: number) {
        this._speedLimitY = value;
    }

}