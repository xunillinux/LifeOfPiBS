import Entity from "../Entity";
import SpritePosition from "../../SpritePosition";

export default class Item extends Entity{
    private _isCollected: boolean;
   
    
    // eslint-disable-next-line
    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number, collision: boolean, isCollected: boolean) {
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision);
        this._isCollected = isCollected;
    }

    public get isCollected(): boolean {
        return this._isCollected;
    }
    public set isCollected(value: boolean) {
        this._isCollected = value;
    }


}