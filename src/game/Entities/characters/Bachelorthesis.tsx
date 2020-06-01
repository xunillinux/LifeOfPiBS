import Npc from './Npc';
import bachelorThesisSpriteImage from '../../images/bachelorthesis.jpg';
import SpritePosition from '../../SpritePosition';
import Map from '../../Map/Map';
import Character from './Character';
import Player from './Player';
import Projectile from '../projectiles/Projectile';

export default class Bachelorthesis extends Npc {
    
    private movingRight:boolean;
    private movingLeft:boolean;
    private ectsKillReward: number;
    private _shootCooldown: number;
    private _shootCooldownTime: number;
    private _regenerateCooldown: number;
    private _regenerateCooldownTime: number;
    private maxLives: number;

    constructor(xPos:number, yPos:number) {

        let spriteMap = new Image();
        spriteMap.src = bachelorThesisSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 86;
        let xVelocity = 2;
        let xVelocityJump = 1;
        let yVelocity = 25;
        let speedLimitY = 25;
        let friction = 0.4;
        let lives = 10;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity,speedLimitY, friction, lives, collision);
        this.xSpeed = 4;
        this.movingLeft = true;
        this.ectsKillReward = 5;
        this._shootCooldown = 0;
        this._shootCooldownTime = 30;
        this._regenerateCooldown = 0;
        this._regenerateCooldownTime = 60;
        this.maxLives = lives;

        this.movingRight = !this.movingLeft;
    }

    public animate(ticks: number) {
        if(this.movingRight){
            this.spritePos.tileY = 0;
        }else{
            this.spritePos.tileY = 1;
        }
        if (ticks % 4 === 0) {
            switch (this.spritePos.tileX % 4) {
                case 0:
                    this.spritePos.tileX = 1 + 4 * this.lives; // 4 * lives -> take sprite that corresponds to current health state
                    break;
                case 1:
                    this.spritePos.tileX = 2 + 4 * this.lives; // 4 * lives -> take sprite that corresponds to current health state
                    break;
                case 2:
                    this.spritePos.tileX = 3 + 4 * this.lives; // 4 * lives -> take sprite that corresponds to current health state
                    break;
                case 3:
                    this.spritePos.tileX = 0 + 4 * this.lives; // 4 * lives -> take sprite that corresponds to current health state
                    break;
                default:
                    this.spritePos.tileX = 0 + 4 * this.lives; // 4 * lives -> take sprite that corresponds to current health state
                    break;
            }
        }
    }

    public update(map: Map){
        
        this.move(map);
        let projectileArray: Projectile[] = [];
        let projectile = this.tryShoot();
        if(projectile){
            projectileArray = projectileArray.concat(projectile);
        }
        if(this.canRegenerate()){
            projectileArray = projectileArray.concat(this.regenerateLives());
        }
        this.updateShootCooldown();
        this.updateRegenerateCooldown();
        return projectileArray;
    }

    private move(map: Map){
        if(this.movingLeft){
            this.moveLeft(map);
        }
        else if(this.movingRight){
            this.moveRight(map);
        }
    }

    private moveLeft(map: Map){
        let mapTileToBotLeft = map.getMapTileAtXY(this.xPos, this.yPos + this.targetSize);
        if (mapTileToBotLeft && (!mapTileToBotLeft.solid || mapTileToBotLeft.hurtful)){
            this.switchDirection();
        }
        else{
            this.xPos -= this.xSpeed;
        }
    }

    private moveRight(map: Map){
        let mapTileToBotRight = map.getMapTileAtXY(this.xPos + this.targetSize, this.yPos + this.targetSize);

        if (mapTileToBotRight && (!mapTileToBotRight.solid || mapTileToBotRight.hurtful)){
            this.switchDirection();
            
        }
        else{
            this.xPos += this.xSpeed;
        }
    }

    public switchDirection(){
        this.movingLeft = !this.movingLeft;
        this.movingRight = !this.movingRight;
    }

    public applyGravity(gravity:number){
        this.ySpeed = (this.ySpeed+gravity > this.speedLimitY) ? this.speedLimitY : this.ySpeed+gravity;
        this.yPos += this.ySpeed;
    }

    public takeDamageFrom(character: Character){
        
        this.lives -= 1;

        if(character instanceof Player && this.isDead()){
            character.addEcts(this.ectsKillReward);
        }

    }

    public tryShoot(){
        if(this.canShoot()){
            return this.shoot();
        }else{
            return null;
        }

    }

    public shoot(directionRight?:boolean): Projectile{
        this._shootCooldown = this._shootCooldownTime;
        let shootDirectionRight = (directionRight) ? directionRight : Math.random() >= 0.5;

        if(shootDirectionRight){
            let projectile = new Projectile(0, 0, true, this);
            projectile.updatePos(this.xPos+this.targetSize, this.yPos+this.targetSize/2 - projectile.targetSize/2);
            return projectile;
        }else{
            let projectile = new Projectile(0, 0, false, this);
            projectile.updatePos(this.xPos-projectile.targetSize, this.yPos+this.targetSize/2 - projectile.targetSize/2);
            return projectile;
        }
    }

    public updateShootCooldown(){
        if(this._shootCooldown > 0){
            this._shootCooldown--;
        }
    }

    private canShoot(){
        return (this._shootCooldown <= 0);
    }

    public updateRegenerateCooldown(){
        if(this._regenerateCooldown > 0){
            this._regenerateCooldown--;
        }
    }

    private canRegenerate(){
        return (this._regenerateCooldown <= 0);
    }

    private regenerateLives(){
        let projectileArray:Projectile[] = [];
        if(this.lives !== this.maxLives){
            this.lives++;
            projectileArray.push(this.shoot(true));
            projectileArray.push(this.shoot(false));
            this._regenerateCooldown = this._regenerateCooldownTime;
        }
        return projectileArray;
    }

}