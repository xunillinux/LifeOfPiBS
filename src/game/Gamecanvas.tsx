import React from 'react';
import './Gamecanvas.css';
import Level from './Levels/Level';
import MapTile from './Map/MapTile';
import Entity from './Entities/Entity';

interface IGameCanvasProps{
    currentLevel: Level;
    ticks: number;
    levelPosX: number;
    entities: Entity[];
    canvasWidth: number;
    canvasHeight: number;
}

interface IGameCanvasState{
}

export default class Canvas extends React.Component<IGameCanvasProps, IGameCanvasState> {

    private gameCanvasRef: any;
    private ctx: any;

    constructor(props: IGameCanvasProps) {
        super(props);
        this.gameCanvasRef = React.createRef();
    }

    render() {
        return (
            <div>
                <canvas id="gameCanvas" ref={this.gameCanvasRef} width={this.props.canvasWidth} height={this.props.canvasHeight} />
            </div>
        )
    }

    componentDidMount() {
        const canvas = this.gameCanvasRef.current;
        this.ctx = canvas.getContext("2d");
    }

    componentDidUpdate(){
        this.drawLevel(this.props.currentLevel, this.props.levelPosX);
        this.drawEntities(this.props.entities, this.props.levelPosX);
    }

    drawLevel(currentLevel: Level, levelPosX: number) {

        this.ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
        if (levelPosX < 0) {
            levelPosX = 0;
        }
        // first tile to display:
        let indexFirstTile = Math.trunc(levelPosX / MapTile.targetSize);
        let offset_x = levelPosX % MapTile.targetSize;

        // last tile to show
        let indexLastTile = indexFirstTile + currentLevel.map.getNumberOfDisplayedTilesWidth();
    
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
                    mapTile.spritePos.getXPosForSpriteWidth(MapTile.sourceSize),
                    mapTile.spritePos.getYPosForSpriteHeight(MapTile.sourceSize),
                    MapTile.sourceSize,
                    MapTile.sourceSize,
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