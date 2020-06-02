import Config from "../Config";

export enum Sounds{
    SHOOT,
    DOOR,
    JUMP,
    SMALLJUMP,
    FELLOUTOFMAP,
    ECTS,
    GAMEOVER,
    BUTTONCLICK
}

export default class Sound {

    private static shootSound = require("./shoot.m4a");
    private static doorSound = require("./door.m4a");
    private static jumpSound = require("./jump.m4a");
    private static smallJumpSound = require("./smallJump.m4a");
    private static fellOutOfMapSound = require("./fellOutOfMap.m4a");
    private static ectsSound = require("./ects.m4a");
    private static gameOverSound = require("./gameOver.m4a");
    private static buttonClickSound = require("./buttonClick.m4a");


    static playSound(sound: Sounds){

        if(!Config.soundsEnabled){
            return;
        }

        let audio;
        switch (sound) {
            case Sounds.SHOOT:
                audio = new Audio(this.shootSound);
                break;
            case Sounds.DOOR:
                audio = new Audio(this.doorSound);
                break;
            case Sounds.JUMP:
                audio = new Audio(this.jumpSound);
                break;
            case Sounds.SMALLJUMP:
                audio = new Audio(this.smallJumpSound);
                break;
            case Sounds.FELLOUTOFMAP:
                audio = new Audio(this.fellOutOfMapSound);
                break;
            case Sounds.ECTS:
                audio = new Audio(this.ectsSound);
                break;
            case Sounds.GAMEOVER:
                audio = new Audio(this.gameOverSound);
                break;
            case Sounds.BUTTONCLICK:
                audio = new Audio(this.buttonClickSound);
                break;
        }

        audio.play();

    }


}