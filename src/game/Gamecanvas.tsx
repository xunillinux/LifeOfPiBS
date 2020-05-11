import React from 'react';
import './Gamecanvas.css';
import gamesketchimg from './images/gamesketchimg.jpg';
import Config from './Config';
import Level from './Levels/Level';
import MapTile from './Map/MapTile';
import Entity from './Entities/Entity';

interface IGameCanvasProps{
    currentLevel: Level;
    ticks: number;
    levelPosX: number;
    entities: Entity[];
}

interface IGameCanvasState{
}

export default class Canvas extends React.Component<IGameCanvasProps, IGameCanvasState> {

    private gameCanvasRef: any;
    private gameSketchImgRef: any;
    private ctx: any;

    constructor(props: IGameCanvasProps) {
        super(props);
        this.gameCanvasRef = React.createRef();
        this.gameSketchImgRef = React.createRef();
    }

    render() {
        if(this.ctx){
            this.drawLevel(this.props.currentLevel, this.props.levelPosX);
            this.drawEntities(this.props.entities, this.props.levelPosX);
        }
        return (
            <div>
                <canvas ref={this.gameCanvasRef} width={Config.canvasSize.w} height={Config.canvasSize.h} />
                <img ref={this.gameSketchImgRef} src={gamesketchimg} className="hidden" alt="gameSketchImg"/>
            </div>
        )
    }

    componentDidMount() {
        const canvas = this.gameCanvasRef.current;
        this.ctx = canvas.getContext("2d");
        const img = this.gameSketchImgRef.current;

        if(this.ctx != null && img != null && img.currentSrc != null){
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            }
        }
        
    }

    drawLevel(currentLevel: Level, levelPosX: number) {

        this.ctx.clearRect(0, 0, Config.canvasSize.w, Config.canvasSize.h);
        if (levelPosX < 0) {
            levelPosX = 0;
        }
        // first tile to display:
        let indexFirstTile = Math.trunc(levelPosX / MapTile.targetSize);
        let offset_x = levelPosX % MapTile.targetSize;

        // last tile to show
        let indexLastTile = indexFirstTile + currentLevel.map.numberOfDisplayedTilesWidth;
    
        let currentLevelMapTiles = currentLevel.map.mapTiles;

        currentLevelMapTiles.forEach((mapTileLayer, index) => {
            this.drawLayer(mapTileLayer, index, indexFirstTile, indexLastTile, offset_x, currentLevel);
        });
        
    }

    drawLayer(mapTileLayer: MapTile[], currentLayerIndex: number, indexFirstTile: number, indexLastTile: number, offset_x: number, currentLevel: Level) {
        for (let indexCurrentTile = indexFirstTile; indexCurrentTile < indexLastTile; indexCurrentTile++) {

            let mapTile = mapTileLayer[indexCurrentTile];
            
            if(mapTile){ //if map template smaller than canvas width map tiles not defined -> TODO refactor
                mapTile.xPosCanvas = indexCurrentTile * MapTile.targetSize - offset_x;
                mapTile.yPosCanvas = currentLayerIndex * MapTile.targetSize;
                this.ctx.drawImage(currentLevel.map.spriteMap,
                    mapTile.spritePos.getXPosForSpriteWidth(MapTile.sourceSize + 1),
                    mapTile.spritePos.getYPosForSpriteHeight(MapTile.sourceSize + 1),
                    MapTile.sourceSize - 0.8,
                    MapTile.sourceSize - 0.8,
                    mapTile.xPosCanvas - (indexFirstTile * MapTile.targetSize),
                    mapTile.yPosCanvas,
                    MapTile.targetSize,
                    MapTile.targetSize
                );

            }

        }
    }

    drawEntities(entities: Entity[], levelPosX: number){
        entities.forEach(entity => {
            this.ctx.drawImage(
                entity.spriteMap,
                entity.spritePos.getXPosForSpriteWidth(entity.sourceSize),
                entity.spritePos.getYPosForSpriteHeight(entity.sourceSize),
                entity.sourceSize,
                entity.sourceSize,
                entity.xPos - levelPosX,
                entity.yPos,
                entity.targetSize,
                entity.targetSize
            );
        });
    }

}