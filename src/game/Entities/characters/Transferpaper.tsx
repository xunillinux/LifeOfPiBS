import Npc from './Npc';
import transferPaperSpriteImage from '../../images/transferpaper.jpg';
import SpritePosition from '../../SpritePosition';
import Map from '../../Map/Map';
import Character from './Character';
import Player from './Player';

export default class Transferpaper extends Npc {
    
    private movingRight:boolean;
    private movingLeft:boolean;
    private ectsKillReward: number;

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
        this.movingRight = !this.movingLeft;
    }

    public animate(ticks: number) {
        if(this.movingRight){
            this.spritePos.tileY = 0;
        }else{
            this.spritePos.tileY = 0;
        }
        if (ticks % 4 === 0) {
            switch (this.spritePos.tileX) {
                
                default:
                    this.spritePos.tileX = 0;
                    break;
            }
        }
    }

    public move(map: Map){
        
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


}