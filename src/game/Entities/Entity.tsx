import SpritePosition from "../SpritePosition";
import Config from "../Config";

class Entity {

    protected xPos: number;
    protected yPos: number;
    protected sprite_pos: any;
    protected source_size: any;
    protected target_size: any;
    protected spriteMap: HTMLImageElement;


    constructor(xPos:number, yPos:number, sprite_pos:any, tilePos?:SpritePosition) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.sprite_pos = sprite_pos;
        this.source_size = Config.entityDefaultsizeSource;
        this.target_size = Config.entityDefaultsizeTarget;
        this.spriteMap = new Image();
        if(tilePos){
            this.xPos = tilePos.tileX*Config.tileSizeTarget.w;
            this.yPos = tilePos.tileY*Config.tileSizeTarget.h;
        }
    }

}

export default Entity;