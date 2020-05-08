import { MapTileType } from './MapTileType';
import SpritePosition from '../SpritePosition';
import ICollisionObject from '../Collision/ICollisionObject';
import { v4 as uuidv4 } from 'uuid';

export default class MapTile implements ICollisionObject{
    private _id: string;

    private _xPos: number;
    private _yPos: number;


    private _xPosCanvas: number;
    private _yPosCanvas: number;

    private _spritePos: SpritePosition;
    
    private _collision: boolean;
    
    private _solid: boolean;
    
    private _hurtful: boolean;
    
    private _type: MapTileType;

    private _friction: number = 0.8;
        

    private static _sourceSize: number = 16;
    private static _targetSize: number = 32;

    private _targetSize: number;
    

    constructor(spritePos: SpritePosition, collision: boolean, solid: boolean, hurtful: boolean, type: MapTileType) {
        this._xPos = 0;
        this._yPos = 0;
        this._xPosCanvas = 0;
        this._yPosCanvas = 0;
        this._spritePos = spritePos;
        this._collision = collision;
        this._solid = solid;
        this._hurtful = hurtful;
        this._type = type;
        this._targetSize = MapTile.targetSize;
        this.setFriction();
        this._id = uuidv4();
    }

    cloneTile(): MapTile{
        let newMapTile = new MapTile(new SpritePosition(this.spritePos.tileX, this.spritePos.tileY), this.collision, this.solid, this.hurtful, this.type);
        newMapTile.xPos = this._xPos;
        newMapTile.yPos = this._yPos;
        newMapTile.xPosCanvas = this._xPosCanvas;
        newMapTile.yPosCanvas = this._yPosCanvas;
        return newMapTile;
    };

    public get id(): string {
        return this._id;
    }

    public get xPos(): number {
        return this._xPos;
    }
    public set xPos(value: number) {
        this._xPos = value;
    }

    public get yPos(): number {
        return this._yPos;
    }
    public set yPos(value: number) {
        this._yPos = value;
    }


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

    public get targetSize(): number {
        return this._targetSize;
    }

    public get friction(): number {
        return this._friction;
    }

    private setFriction(){
        switch (this._type) {
            case MapTileType.ICE:
                this._friction = 0.95;
                break;
            default:
                this._friction = 0.8;
                break;
        }
    }

}