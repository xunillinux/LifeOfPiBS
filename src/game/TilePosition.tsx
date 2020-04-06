export default class TilePosition {

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
}