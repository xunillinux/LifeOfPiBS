import MapTile from "./MapTile";
import { MapTileType } from "./MapTileType";
import mapTileImage from "../images/mapTileImage.jpg";
import SpritePosition from "../SpritePosition";

export default class Map {

    private _mapTiles: MapTile[][];
    private _spriteMap: HTMLImageElement;
    private _sourceSize: number;
    private _targetSize: number;

    constructor(template: string[]) {

        this._mapTiles = this.generateMapTiles(template);
        this._spriteMap = new Image();
        this._spriteMap.src = mapTileImage;

        this._sourceSize = 16;
        this._targetSize = 32;

    }

    private generateMapTiles(template: string[]){
        let mapTiles: MapTile[][] = [];
        template.forEach(layer => {
            let currentLayerTiles: MapTile[] = [];
            
            for(let i=0; i < layer.length; i++){
                
                currentLayerTiles.push(Map.tiles[layer[i]].cloneTile());
            }
        });
        return mapTiles;
    }

    private static tiles: { [id: string]: MapTile } = {
        '#' : new MapTile(new SpritePosition(0,0),true,true,false, MapTileType.DEFAULT),
        'o' : new MapTile(new SpritePosition(0,1),false,false,false, MapTileType.DEFAULT),
        'x' : new MapTile(new SpritePosition(0,2),true,true,false, MapTileType.HIDDEN),
        'r' : new MapTile(new SpritePosition(0,3),false,false,false, MapTileType.HIDDEN),
        'u' : new MapTile(new SpritePosition(0,4),true,false,false, MapTileType.TRAMPOLINE),
        'k' : new MapTile(new SpritePosition(0,5),true,false,false, MapTileType.EXIT),
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

    public get sourceSize(): number {
        return this._sourceSize;
    }

    public get targetSize(): number {
        return this._targetSize;
    }

}