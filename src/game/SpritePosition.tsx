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

    public get tileY(): number {
        return this._tileY;
    }

    public getXPosForSpriteWidth(spriteSizeWidth:number): number {
        return spriteSizeWidth*this._tileX;
    }

    public getYPosForSpriteHeight(spriteSizeHeight:number): number {
        return spriteSizeHeight*this._tileY;
    }
}