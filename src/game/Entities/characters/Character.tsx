import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";

export default class Character extends Entity{

    private _xSpeed: number;
    private _ySpeed: number;

    private _xVelocity: number;
    private _xVelocityJump: number;
    private _yVelocity: number;
    private _friction: number;
    

    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, xVelocity:number, xVelocityJump: number, yVelocity:number, friction:number) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize);
        this._xSpeed = 0;
        this._ySpeed = 0;

        this._xVelocity = xVelocity;
        this._xVelocityJump = xVelocityJump;
        this._yVelocity = yVelocity;
        this._friction = friction;
    }

    //TODO probably replace with "moveRight moveLeft moveUp and moveDown, which calculates new position dependant on x and y velocity"
    updatePos(xPos:number, yPos:number){
        this.xPos = xPos;
        this.yPos = yPos;
    }

    protected get xSpeed(): number {
        return this._xSpeed;
    }
    protected set xSpeed(value: number) {
        this._xSpeed = value;
    }

    protected get ySpeed(): number {
        return this._ySpeed;
    }
    protected set ySpeed(value: number) {
        this._ySpeed = value;
    }

    protected get xVelocity(): number {
        return this._xVelocity;
    }

    protected get xVelocityJump(): number {
        return this._xVelocityJump;
    }

    protected get yVelocity(): number {
        return this._yVelocity;
    }

    protected get friction(): number {
        return this._friction;
    }
    protected set friction(value: number) {
        this._friction = value;
    }

}