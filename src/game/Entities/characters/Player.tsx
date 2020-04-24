import Character from './Character';
import playerSpriteImage from '../../images/playerSprite.jpg';
import SpritePosition from '../../SpritePosition';

export default class Player extends Character {

    private _speedLimitY: number;
    private _tookDamage: boolean;
    
    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = playerSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 42;
        let xVelocity = 1.5;
        let xVelocityJump = 1;
        let yVelocity = 25;
        let friction = 0.8; //TODO probably move friction to TileTypes
        let lives = 3;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, lives);
        this._speedLimitY = 25;
        this._tookDamage = false;
    }


    public accelerateRight(){
        
        if(this.ySpeed === 0){
            this.xSpeed += this.xVelocity;
        } else {
            this.xSpeed += this.xVelocityJump;
        }

    }

    public accelerateLeft(){

        if(this.ySpeed === 0){
            this.xSpeed -= this.xVelocity;
        } else {
            this.xSpeed -= this.xVelocityJump;
        }

    }

    public jump(){

        if(this.ySpeed === 0){
            this.ySpeed -= this.yVelocity; // - because y 0 is on top of canvas so -y means upwards
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

}