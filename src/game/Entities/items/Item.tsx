import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";

export default class Item extends Entity{
    
    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize);
    }

}