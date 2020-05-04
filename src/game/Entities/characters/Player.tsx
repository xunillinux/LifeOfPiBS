import Character from './Character';
import playerSpriteImage from '../../images/playerSprite.jpg';
import SpritePosition from '../../SpritePosition';

export default class Player extends Character {

    private _speedLimitX: number;
    private _speedLimitY: number;
    private _tookDamage: boolean;
    private _ects: number;

    
    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = playerSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 42;
        let xVelocity = 2;
        let xVelocityJump = 0.5;
        let yVelocity = 25;
        let friction = 0.95;
        let lives = 3;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, lives, collision);
        this._speedLimitX = 12;
        this._speedLimitY = 25;
        this._tookDamage = false;
        this._ects = 0;
    }


    public accelerateRight(){
        
        if(this.xSpeed < this._speedLimitX){
            if(this.ySpeed === 0){
                this.xSpeed += this.xVelocity * this.friction;
            } else {
                this.xSpeed += this.xVelocityJump * this.friction;
            }
        }
    }

    public accelerateLeft(){

        if(this.xSpeed > -this._speedLimitX){
            if(this.ySpeed === 0){
                this.xSpeed -= this.xVelocity * this.friction;
            } else {
                this.xSpeed -= this.xVelocityJump * this.friction;
            }
        }
    }

    public jump(){

        if(this.ySpeed === 0){
            this.ySpeed -= this.yVelocity; // - because y 0 is on top of canvas so -y means upwards
        }

    }

    public smallJump(){
        if(this.ySpeed === 0){
            this.ySpeed -= this.yVelocity/2; // - because y 0 is on top of canvas so -y means upwards
        }
    }

    public bigJump(){
        if(this.ySpeed === 0){
            this.ySpeed -= this.yVelocity*2; // - because y 0 is on top of canvas so -y means upwards
        }
    }

    public animate(){
        //TODO
    }

    public applyGravity(gravity:number){

        this.ySpeed = (this.ySpeed+gravity > this.speedLimitY) ? this.speedLimitY : this.ySpeed+gravity;

    }

    public updatePos(){
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }

    public resetPlayer() {
        this.lives = 3;
        this._tookDamage = false;
    }

    public fellOutOfMap(){
        this.takeDamage();
    }

    public takeDamage(){
        super.takeDamage()
        this._tookDamage = true;
    }

    public get speedLimitY(): number {
        return this._speedLimitY;
    }
    public set speedLimitY(value: number) {
        this._speedLimitY = value;
    }
    public get tookDamage(): boolean {
        return this._tookDamage;
    }
    public set tookDamage(value: boolean) {
        this._tookDamage = value;
    }

    public get ects(): number {
        return this._ects;
    }

    public addEcts() {
        this._ects++;
    }

}