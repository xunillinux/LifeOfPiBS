import Config from "../Config";

export enum Sounds{
    SHOOT,
    DOOR,
    JUMP,
    SMALLJUMP,
    FELLOUTOFMAP,
    ECTS
}

export default class Sound {

    private static shootSound = require("./shoot.m4a");
    private static doorSound = require("./door.m4a");
    private static jumpSound = require("./jump.m4a");
    private static smallJumpSound = require("./smallJump.m4a");
    private static fellOutOfMapSound = require("./fellOutOfMap.m4a");
    private static ectsSound = require("./ects.m4a");


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
        }

        audio.play();

    }


}