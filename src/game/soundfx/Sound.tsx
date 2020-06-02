import Config from "../Config";

export enum Sounds{
    SHOOT
}

export default class Sound {

    private static shootSoundFile = require("./shoot.m4a");


    static playSound(sound: Sounds){

        if(!Config.soundsEnabled){
            return;
        }

        let audio;
        switch (sound) {
            case Sounds.SHOOT:
                audio = new Audio(this.shootSoundFile);
                break;
        }

        audio.play();

    }


}