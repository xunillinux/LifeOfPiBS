import Npc from './Npc';
import profSpriteImage from '../../images/profSprite.jpg';
import SpritePosition from '../../SpritePosition';
import Map from '../../Map/Map';

export default class Prof extends Npc {
    
    private movingRight:boolean;
    private movingLeft:boolean;

    constructor(xPos:number, yPos:number) {

        let spriteMap = new Image();
        spriteMap.src = profSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 32;
        let targetSize = 32;
        let xVelocity = 2;
        let xVelocityJump = 1;
        let yVelocity = 25;
        let speedLimitY = 25;
        let friction = 0.4;
        let lives = 1;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity,speedLimitY, friction, lives, collision);
        this.xSpeed = 4;
        this.movingLeft = true;
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


}