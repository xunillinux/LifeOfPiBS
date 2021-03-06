/**
 * 
 * helper class for transforming relative positions of sprites in a sprite image
 * into x and y pixel values depending on the used sprite size
 * 
 */
export default class SpritePosition {

    private _tileX: number;
    
    private _tileY: number;
    
    constructor(tileX: number, tileY: number) {

        this._tileX = tileX;
        this._tileY = tileY;
    }

    public get tileX(): number {
        return this._tileX;
    }

    public set tileX(value: number) {
        this._tileX = value;
    }

    public get tileY(): number {
        return this._tileY;
    }

    public set tileY(value: number) {
        this._tileY = value;
    }


    public getXPosForSpriteWidth(spriteSizeWidth:number): number {
        return spriteSizeWidth*this._tileX;
    }

    public getYPosForSpriteHeight(spriteSizeHeight:number): number {
        return spriteSizeHeight*this._tileY;
    }
}