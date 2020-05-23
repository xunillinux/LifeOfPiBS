import Npc from './Npc';
import transferPaperSpriteImage from '../../images/Transferpaper_10_hits.jpg';
import SpritePosition from '../../SpritePosition';
import Map from '../../Map/Map';
import Character from './Character';
import Player from './Player';
import Projectile from '../projectiles/Projectile';

export default class Transferpaper extends Npc {
    
    private movingRight:boolean;
    private movingLeft:boolean;
    private ectsKillReward: number;
    private _shootCooldown: number;
    private _shootCooldownTime: number;

    constructor(xPos:number, yPos:number) {

        let spriteMap = new Image();
        spriteMap.src = transferPaperSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 64;
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
        this._shootCooldownTime = 20;
        this.movingRight = !this.movingLeft;
    }

    public animate(ticks: number) {
        if(this.movingRight){
            this.spritePos.tileY = 0;
        }else{
            this.spritePos.tileY = 1;
        }
        if (ticks % 4 === 0) {
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
    }

    public update(map: Map){
        
        this.move(map);
        let projectile = this.shoot();
        if(projectile){
            return projectile;
        }
        this.updateShootCooldown();

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

    public shoot(): Projectile | null{

        if(!this.canShoot()){
            return null;
        }

        this._shootCooldown = this._shootCooldownTime;
        let shootDirectionRight = Math.random() >= 0.5;

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


}