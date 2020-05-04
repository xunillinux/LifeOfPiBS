import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";

export default class Character extends Entity{

    private _xSpeed: number;
    private _ySpeed: number;


    private _xVelocity: number;
    private _xVelocityJump: number;
    private _yVelocity: number;
    private _friction: number;
    

    private _lives: number;
    

    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, xVelocity:number, xVelocityJump: number, yVelocity:number, friction:number, lives:number, collision: boolean) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
        this._xSpeed = 0;
        this._ySpeed = 0;

        this._xVelocity = xVelocity;
        this._xVelocityJump = xVelocityJump;
        this._yVelocity = yVelocity;
        this._friction = friction;

        this._lives = lives;
    }

    public fellOutOfMap(){
        this.takeDamage();
    }

    public addLife(){
        this._lives += 1;
    }

    public takeDamage(){
        this._lives -= 1;
    }

    public kill(){
        this._lives = 0;
    }

    public isDead(): boolean {
        return this._lives <= 0;
    }

    public get xSpeed(): number {
        return this._xSpeed;
    }
    public set xSpeed(value: number) {
        this._xSpeed = value;
    }

    public get ySpeed(): number {
        return this._ySpeed;
    }
    public set ySpeed(value: number) {
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

    public get lives(): number {
        return this._lives;
    }
    public set lives(value: number) {
        this._lives = value;
    }

}