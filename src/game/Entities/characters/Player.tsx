import Character from './Character';
import playerSpriteImage from '../../images/playerSprite.jpg';

class Player extends Character {

    private lives: number;
    private speedLimitY: number;

    constructor(xPos:number, yPos:number, sprite_pos:any, lives:number, xVelocity:number, yVelocity:number) {
        let friction = 0.8;
        super(xPos, yPos, sprite_pos, xVelocity, yVelocity, friction);
        this.lives = lives;
        this.speedLimitY = 25;
        this.spriteMap.src = playerSpriteImage;
    }

    resetPlayer() {
        this.lives = 3;
        this.xPos = 0;
    }

}

export default Player;