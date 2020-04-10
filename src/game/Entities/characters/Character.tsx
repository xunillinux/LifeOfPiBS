import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";

class Character extends Entity{

    protected xSpeed: number;
    protected ySpeed: number;

    protected xVelocity: number;
    protected yVelocity: number;
    protected friction: number;

    constructor(xPos:number, yPos:number, sprite_pos:any, xVelocity:number, yVelocity:number, friction:number, tilePos?:SpritePosition) {
        super(xPos, yPos, sprite_pos, tilePos);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.friction = friction;
    }

    updatePos(xPos:number, yPos:number){
        this.xPos = xPos;
        this.yPos = yPos;
    }

}

export default Character;