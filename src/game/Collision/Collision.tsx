export default class Collision{

    private _top: boolean;
    private _bot: boolean;
    private _right: boolean;
    private _left: boolean;
    
    constructor()
    constructor(top?:boolean,bot?:boolean,left?:boolean,right?:boolean){
        this._top = top || false;
        this._bot = bot || false;
        this._right = right || false;
        this._left = left || false;
    }

    public doesCollide(): boolean{
        return this._top || this._bot || this._right || this._left;
    }

    public get top(): boolean {
        return this._top;
    }
    public set top(value: boolean) {
        this._top = value;
    }

    public get bot(): boolean {
        return this._bot;
    }
    public set bot(value: boolean) {
        this._bot = value;
    }

    public get right(): boolean {
        return this._right;
    }
    public set right(value: boolean) {
        this._right = value;
    }

    public get left(): boolean {
        return this._left;
    }
    public set left(value: boolean) {
        this._left = value;
    }
    

}