import Character from './Character';
import playerSpriteImage from '../../images/playerSprite.jpg';
import SpritePosition from '../../SpritePosition';
import Map from '../../Map/Map';
import Projectile from '../projectiles/Projectile';

export default class Player extends Character {

    private _speedLimitX: number;
    private _speedLimitY: number;
    private _tookDamage: boolean;
    private _ects: number;
    private _facingRight: boolean;
    private _shootCooldown: number;
    private _shootCooldownTime: number;
    private _maxLives: number;
    

    
    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = playerSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 42;
        let xVelocity = 2;
        let xVelocityJump = 2;
        let yVelocity = 25;
        let friction = 0.9;
        let maxLives = 3;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, maxLives, collision);
        this._speedLimitX = 12;
        this._speedLimitY = 25;
        this._tookDamage = false;
        this._ects = 0;
        this._facingRight = true;
        this._shootCooldown = 0;
        this._shootCooldownTime = 15;
        this._maxLives = maxLives;
    }


    public accelerateRight(){
        
        if(this.xSpeed < this._speedLimitX){
            if(this.ySpeed === 0){
                this.xSpeed += this.xVelocity * this.friction;
            } else {
                this.xSpeed += this.xVelocityJump * this.friction;
            }
        }
        this._facingRight = (this.xSpeed > 0);
    }

    public accelerateLeft(){

        if(this.xSpeed > -this._speedLimitX){
            if(this.ySpeed === 0){
                this.xSpeed -= this.xVelocity * this.friction;
            } else {
                this.xSpeed -= this.xVelocityJump * this.friction;
            }
        }
        this._facingRight = (this.xSpeed > 0);
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

    public animate(ticks: number) {
        if(this._facingRight){
            this.spritePos.tileY = 0;
        }else{
            this.spritePos.tileY = 1;
        }
        if(this.ySpeed !== 0){
            this.spritePos.tileX = 4;
        }
        else if (ticks % 4 === 0 && this.xSpeed !== 0) {
            switch (this.spritePos.tileX) {
                case 0:
                    this.spritePos.tileX = 1;
                    break;
                case 1:
                    this.spritePos.tileX = 2;
                    break;
                case 2:
                    this.spritePos.tileX = 3;
                    break;
                case 3:
                    this.spritePos.tileX = 0;
                    break;
                default:
                    this.spritePos.tileX = 0;
                    break;
            }
        }
        else{
            this.spritePos.tileX = 0;
        }
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

    public handleLevelEdgeCollision(map: Map){
        if (this.xPos < 0) {
            this.xPos = 0;
            this.xSpeed = 0;
        }
        else if (this.xPos + this.targetSize > map.mapWidth) {
            this.xPos = map.mapWidth - this.targetSize;
            this.xSpeed = 0;
        }
    }

    public shoot(): Projectile | null{

        if(!this.canShoot()){
            return null;
        }

        this._shootCooldown = this._shootCooldownTime;

        if(this._facingRight){
            let projectile = new Projectile(0, 0, true);
            projectile.updatePos(this.xPos+this.targetSize, this.yPos+this.targetSize/2 - projectile.targetSize/2);
            console.log(projectile);
            return projectile;
        }else{
            let projectile = new Projectile(0, 0, false);
            projectile.updatePos(this.xPos-projectile.targetSize, this.yPos+this.targetSize/2 - projectile.targetSize/2);
            return projectile;
        }
    }

    public updateShootCooldown(){
        if(this._shootCooldown > 0){
            this._shootCooldown--;
        }
    }

    public addEcts() {
        this._ects++;
    }

    private canShoot(){
        return (this._shootCooldown <= 0);
    }


    public get maxLives(): number {
        return this._maxLives;
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

}