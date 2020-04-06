import { TileType } from './TileType';

export default class Tile {

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
    private _type: TileType;
    public get type(): TileType {
        return this._type;
    }
    public set type(value: TileType) {
        this._type = value;
    }


    constructor(xPos: number, yPos: number, collision: boolean, solid: boolean, hurtful: boolean, type: TileType) {

        this._xPos = xPos;
        this._yPos = yPos;
        this._collision = collision;
        this._solid = solid;
        this._hurtful = hurtful;
        this._type = type;

    }

    cloneTile(): Tile{
        return new Tile(this.xPos, this.yPos, this.collision, this.solid, this.hurtful, this.type);
    };


}