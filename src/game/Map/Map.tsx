import MapTile from "./MapTile";
import { MapTileType } from "./MapTileType";
import mapTileImage from "../images/mapTileImage.jpg";
import SpritePosition from "../SpritePosition";
import Config from "../Config";

export default class Map {

    private _mapTiles: MapTile[][];
    private _spriteMap: HTMLImageElement;
    private _numberOfTilesWidth: number;
    private _numberOfTilesHeight: number;

    constructor(template: string[]) {

        this._mapTiles = this.generateMapTiles(template);
        this._spriteMap = new Image();
        this._spriteMap.src = mapTileImage;

        this._numberOfTilesWidth = Config.canvasSize.w / MapTile.targetSize; 
        this._numberOfTilesHeight = Config.canvasSize.h / MapTile.targetSize;

    }

    private generateMapTiles(template: string[]){
        let mapTiles: MapTile[][] = [];
        template.forEach(layer => {
            let currentLayerTiles: MapTile[] = [];
            for(let i=0; i < layer.length; i++){
                currentLayerTiles.push(Map.tiles[layer[i]].cloneTile());
            }
            mapTiles.push(currentLayerTiles);
        });
        return mapTiles;
    }

    private static tiles: { [id: string]: MapTile } = {
        ' ' : new MapTile(new SpritePosition(0,0),true,true,false, MapTileType.DEFAULT),
        '#' : new MapTile(new SpritePosition(1,0),false,false,false, MapTileType.DEFAULT),
        'x' : new MapTile(new SpritePosition(2,0),true,true,false, MapTileType.HIDDEN),
        'r' : new MapTile(new SpritePosition(3,0),false,false,false, MapTileType.HIDDEN),
        'u' : new MapTile(new SpritePosition(4,0),true,false,false, MapTileType.TRAMPOLINE),
        'k' : new MapTile(new SpritePosition(5,0),true,false,false, MapTileType.EXIT),
    }

    public get mapTiles(): MapTile[][] {
        return this._mapTiles;
    }
    public set mapTiles(value: MapTile[][]) {
        this._mapTiles = value;
    }

    public get spriteMap(): HTMLImageElement {
        return this._spriteMap;
    }
    public set spriteMap(value: HTMLImageElement) {
        this._spriteMap = value;
    }

    public get numberOfTilesWidth(): number {
        return this._numberOfTilesWidth;
    }

}