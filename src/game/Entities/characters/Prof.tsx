import Npc from './Npc';
import profSpriteImage from '../../images/profSprite.jpg';
import SpritePosition from '../../SpritePosition';
import MapTile from '../../Map/MapTile';
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
        let xVelocity = 4;
        let xVelocityJump = 1;
        let yVelocity = 25;
        let friction = 0.4;
        let lives = 1;
        let collision = true;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, xVelocity, xVelocityJump, yVelocity, friction, lives, collision);
        this.movingLeft = true;
        this.movingRight = !this.movingLeft;
    }

    public animate(ticks: number) {
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

    public move(levelPosX: number, map: Map){
        
        if(this.movingLeft){
            this.moveLeft(levelPosX, map);
        }
        else if(this.movingRight){
            this.moveRight(levelPosX, map);
        }

    }

    private moveLeft(levelPosX: number, map: Map){
        let mapTileToBotLeft = map.getMapTileAtXY(this.xPos - MapTile.targetSize, this.yPos + this.targetSize);
        console.log(mapTileToBotLeft);
        if (!mapTileToBotLeft.solid || mapTileToBotLeft.hurtful){
            this.switchDirection();
        }
        else{
            this.xPos -= this.xVelocity;
        }
    }

    private moveRight(levelPosX: number, map: Map){
        let mapTileToBotRight = map.getMapTileAtXY(this.xPos + MapTile.targetSize, this.yPos + this.targetSize);

        if (!mapTileToBotRight.solid || mapTileToBotRight.hurtful){
            this.switchDirection();
        }
        else{
            this.xPos += this.xVelocity;
        }
    }

    public switchDirection(){
        this.movingLeft = !this.movingLeft;
        this.movingRight = !this.movingRight;
    }


}