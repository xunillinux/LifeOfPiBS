class Character {

    protected xPos: number;
    protected yPos: number;
    protected xSpeed: number;
    protected ySpeed: number;
    protected sprite_pos: any;
    protected source_size: any;
    protected target_size: any;
    protected spriteMap: any;

    protected xVelocity: number;
    protected yVelocity: number;
    protected friction: number;

    constructor(xPos:number, yPos:number, sprite_pos:any, xVelocity:number, yVelocity:number, friction:number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.sprite_pos = sprite_pos;
        this.source_size = {w:32, h:32}; //TODO get from Config class
        this.target_size = {w:42, h:42}; //TODO get from Config class
        this.spriteMap = new Image(); //TODO

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