import Character from './Character';

class Player extends Character {

    private lives: number;
    private speedLimitY: number;

    constructor(xPos:number, yPos:number, sprite_pos:any, lives:number, xVelocity:number, yVelocity:number) {
        let friction = 0.8;
        super(xPos, yPos, sprite_pos, xVelocity, yVelocity, friction);
        this.lives = lives;
        this.speedLimitY = 25;
    }

    resetPlayer() {
        this.lives = 3;
        this.xPos = 0;
    }

}

export default Player;