import SpritePosition from "../SpritePosition";

export default class Entity {

    private _xPos: number;
    private _yPos: number;
    
    private _spriteMap: HTMLImageElement;
    private _spritePos: SpritePosition;
    private _sourceSize: number;
    private _targetSize: number;

    constructor(xPos:number, yPos:number, spriteMap:HTMLImageElement, spritePos:SpritePosition, sourceSize:number, targetSize:number) {
        this._xPos = xPos;
        this._yPos = yPos;

        this._spriteMap = spriteMap;
        this._spritePos = spritePos;
        this._sourceSize = sourceSize;
        this._targetSize = targetSize;
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

    public get spriteMap(): HTMLImageElement {
        return this._spriteMap;
    }
    public set spriteMap(value: HTMLImageElement) {
        this._spriteMap = value;
    }

    public get spritePos(): SpritePosition {
        return this._spritePos;
    }
    public set spritePos(value: SpritePosition) {
        this._spritePos = value;
    }
    
    public get sourceSize(): number {
        return this._sourceSize;
    }
    public set sourceSize(value: number) {
        this._sourceSize = value;
    }

    public get targetSize(): number {
        return this._targetSize;
    }
    public set targetSize(value: number) {
        this._targetSize = value;
    }
}