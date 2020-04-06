import TilePosition from "./TilePosition";

export default class Level {

    private name: string;
    private backgroundColor: string;
    private _template: string[];
     
    private _enemyPositions: TilePosition[];
    private _coinPositions: TilePosition[];
   
   

    constructor(name: string, backgroundColor: string, template: string[], enemyPositions: TilePosition[], coinPositions: TilePosition[]) {

        this.name = name;
        this.backgroundColor = backgroundColor;
        this._template = template;
        this._enemyPositions = enemyPositions;
        this._coinPositions = coinPositions;

    }

    public get template(): string[] {
        return this._template;
    }

    public get enemyPositions(): TilePosition[] {
        return this._enemyPositions;
    }

    public get coinPositions(): TilePosition[] {
        return this._coinPositions;
    }
}