import { MapTileType } from './MapTileType';
import SpritePosition from '../SpritePosition';

export default class MapTile {

    private _xPosCanvas: number;
    private _yPosCanvas: number;

    private _spritePos: SpritePosition;
    
    private _collision: boolean;
    
    private _solid: boolean;
    
    private _hurtful: boolean;
    
    private _type: MapTileType;

    private static _sourceSize: number = 16;
    private static _targetSize: number = 32;
    

    constructor(spritePos: SpritePosition, collision: boolean, solid: boolean, hurtful: boolean, type: MapTileType) {

        this._xPosCanvas = 0;
        this._yPosCanvas = 0;
        this._spritePos = spritePos;
        this._collision = collision;
        this._solid = solid;
        this._hurtful = hurtful;
        this._type = type;

    }

    cloneTile(): MapTile{
        return new MapTile(new SpritePosition(this.spritePos.tileX, this.spritePos.tileY), this.collision, this.solid, this.hurtful, this.type);
    };

    public get xPosCanvas(): number {
        return this._xPosCanvas;
    }
    public set xPosCanvas(value: number) {
        this._xPosCanvas = value;
    }

    public get yPosCanvas(): number {
        return this._yPosCanvas;
    }
    public set yPosCanvas(value: number) {
        this._yPosCanvas = value;
    }

    public get spritePos(): SpritePosition {
        return this._spritePos;
    }
    public set spritePos(value: SpritePosition) {
        this._spritePos = value;
    }

    public get collision(): boolean {
        return this._collision;
    }
    public set collision(value: boolean) {
        this._collision = value;
    }

    public get solid(): boolean {
        return this._solid;
    }
    public set solid(value: boolean) {
        this._solid = value;
    }

    public get hurtful(): boolean {
        return this._hurtful;
    }
    public set hurtful(value: boolean) {
        this._hurtful = value;
    }

    public get type(): MapTileType {
        return this._type;
    }
    public set type(value: MapTileType) {
        this._type = value;
    }

    public static get sourceSize(): number {
        return MapTile._sourceSize;
    }

    public static get targetSize(): number {
        return MapTile._targetSize;
    }

}