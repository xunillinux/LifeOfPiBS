import { MapTileType } from './MapTileType';

export default class MapTile {

    private _xPos: number;
    public get xPos(): number {
        return this._xPos;
    }
    public set xPos(value: number) {
        this._xPos = value;
    }
    private _yPos: number;
    public get yPos(): number {
        return this._yPos;
    }
    public set yPos(value: number) {
        this._yPos = value;
    }
    private _collision: boolean;
    public get collision(): boolean {
        return this._collision;
    }
    public set collision(value: boolean) {
        this._collision = value;
    }
    private _solid: boolean;
    public get solid(): boolean {
        return this._solid;
    }
    public set solid(value: boolean) {
        this._solid = value;
    }
    private _hurtful: boolean;
    public get hurtful(): boolean {
        return this._hurtful;
    }
    public set hurtful(value: boolean) {
        this._hurtful = value;
    }
    private _type: MapTileType;
    public get type(): MapTileType {
        return this._type;
    }
    public set type(value: MapTileType) {
        this._type = value;
    }


    constructor(xPos: number, yPos: number, collision: boolean, solid: boolean, hurtful: boolean, type: MapTileType) {

        this._xPos = xPos;
        this._yPos = yPos;
        this._collision = collision;
        this._solid = solid;
        this._hurtful = hurtful;
        this._type = type;

    }

    cloneTile(): MapTile{
        return new MapTile(this.xPos, this.yPos, this.collision, this.solid, this.hurtful, this.type);
    };


}