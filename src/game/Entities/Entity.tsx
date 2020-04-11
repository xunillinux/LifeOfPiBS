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

    protected get xPos(): number {
        return this._xPos;
    }
    protected set xPos(value: number) {
        this._xPos = value;
    }

    protected get yPos(): number {
        return this._yPos;
    }
    protected set yPos(value: number) {
        this._yPos = value;
    }

    protected get spriteMap(): HTMLImageElement {
        return this._spriteMap;
    }
    protected set spriteMap(value: HTMLImageElement) {
        this._spriteMap = value;
    }

    protected get spritePos(): SpritePosition {
        return this._spritePos;
    }
    protected set spritePos(value: SpritePosition) {
        this._spritePos = value;
    }
    
    protected get sourceSize(): number {
        return this._sourceSize;
    }
    protected set sourceSize(value: number) {
        this._sourceSize = value;
    }

    protected get targetSize(): number {
        return this._targetSize;
    }
    protected set targetSize(value: number) {
        this._targetSize = value;
    }
}