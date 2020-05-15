import MapTile from "./MapTile";
import { MapTileType } from "./MapTileType";
import mapTileImage from "../images/mapTileImage.jpg";
import SpritePosition from "../SpritePosition";
import Config from "../Config";

export default class Map {

    private _mapTiles: MapTile[][];
    private _spriteMap: HTMLImageElement;
    private _mapWidth: number;
    private _mapHeight: number;
   

    constructor(template: string[]) {

        this._mapTiles = this.generateMapTiles(template);
        this._spriteMap = new Image();
        this._spriteMap.src = mapTileImage;

        this._mapWidth = MapTile.targetSize * this._mapTiles[0].length;
        this._mapHeight = MapTile.targetSize * this._mapTiles.length;
    }

    public getNumberOfDisplayedTilesWidth(): number{
        return Config.canvasSize.w / MapTile.targetSize; 
    }

    public numberOfDisplayedTilesHeight(): number{
        return Config.canvasSize.h / MapTile.targetSize;
    }

    private generateMapTiles(template: string[]){
        let mapTiles: MapTile[][] = [];
        template.forEach((layer, layerIndex) => {
            let currentLayerTiles: MapTile[] = [];
            for(let tileIndex=0; tileIndex < layer.length; tileIndex++){
                let newTileIndex = currentLayerTiles.push(Map.tiles[layer[tileIndex]].cloneTile())-1;
                currentLayerTiles[newTileIndex].xPos = tileIndex*MapTile.targetSize;
                currentLayerTiles[newTileIndex].yPos = layerIndex*MapTile.targetSize;
            }
            mapTiles.push(currentLayerTiles);
        });
        return mapTiles;
    }

    public getGroundLevel(): number{
        return this.mapHeight - MapTile.targetSize*2; //second last tile on y axis
    }

    private static tiles: { [id: string]: MapTile } = {
        ' ' : new MapTile(new SpritePosition(0,0),false,false,false, MapTileType.DEFAULT),
        '.' : new MapTile(new SpritePosition(1,0),false,false,false, MapTileType.DEFAULT),
        '#' : new MapTile(new SpritePosition(2,0),true,true,false, MapTileType.DEFAULT),
        '@' : new MapTile(new SpritePosition(3,0),true,true,false, MapTileType.DEFAULT),
    }

    public getMapTileAtXY(x:number, y:number): MapTile{
        let xTileIndex = Math.trunc(x / MapTile.targetSize);
        let yTileIndex = Math.trunc(y / MapTile.targetSize);

        return this.mapTiles[yTileIndex][xTileIndex];
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

    public get mapWidth(): number {
        return this._mapWidth;
    }
    public get mapHeight(): number {
        return this._mapHeight;
    }

}