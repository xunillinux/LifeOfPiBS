import React from 'react';
import './Gamecanvas.css';
import gamesketchimg from './images/gamesketchimg.jpg';
import Controls from './Controls';
import Config from './Config';
import Levels from './Levels/Levels';
import Level from './Levels/Level';
import Npc from './Entities/characters/Npc';
import Ects from './Entities/items/Ects';
import MapTile from './Map/MapTile';
import Player from './Entities/characters/Player';
import Character from './Entities/characters/Character';

class Canvas extends React.Component {

    private gameCanvasRef: any;
    private gameSketchImgRef: any;

    private ctx: any;

    private collisionMap: any = [];
    private ticks: number = 0;

    // position displayed level
    private levelPosX: number = 0;
    // scroll position at the beginning of the game loop
    private levelPosXStart = 0;

    private currentLevel: Level = Levels.levels[0];
    private player: Player = new Player(0, 0);

    private characters: Character[] = [];

    constructor(props: any) {
        super(props);
        this.gameCanvasRef = React.createRef();
        this.gameSketchImgRef = React.createRef();

        this.gameLoop = this.gameLoop.bind(this);

        this.startGame();
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

    render() {

        return (
            <div>
                <canvas ref={this.gameCanvasRef} width={Config.canvasSize.w} height={Config.canvasSize.h} />
                <img ref={this.gameSketchImgRef} src={gamesketchimg} className="hidden" alt="gameSketchImg"/>
            </div>
        )
    }

    startGame() {
        //hideMenus();
        Controls.registerKeyEvents()
        this.initializeLevel();
        window.clearInterval(Config.gameInterval);
        Config.gameInterval = setInterval(this.gameLoop, 1000 / Config.fps);
    }

    gameLoop() {
        this.ticks++;
        this.drawLevel();
        /*
        if(Controls.heldRight){
            this.levelPosX += 5;
        }*/
        //updateCharacters();
        //updateElements();
        //drawElements();
        this.drawCharacters();
        //drawControls();
    }

    initializeLevel(){
        this.collisionMap = [];
        this.player.resetPlayer();
        this.levelPosX = 0;
        this.characters = this.currentLevel.enemies;
        this.characters.push(this.player);
    }



    drawLevel() {

        this.ctx.clearRect(0, 0, Config.canvasSize.w, Config.canvasSize.h);
        this.collisionMap = [];
        if (this.levelPosX < 0) {
            this.levelPosX = 0;
        }
        this.levelPosXStart = this.levelPosX;
        // first tile to display:
        let indexFirstTile = Math.trunc(this.levelPosX / MapTile.targetSize);
        let offset_x = this.levelPosX % MapTile.targetSize;

        // last tile to show
        let indexLastTile = indexFirstTile + this.currentLevel.map.numberOfTilesWidth;
    
        let currentLevelMapTiles = this.currentLevel.map.mapTiles;

        currentLevelMapTiles.forEach((mapTileLayer, index) => {
            this.drawLayer(mapTileLayer, index, indexFirstTile, indexLastTile, offset_x);
        });
        
    }

    drawLayer(mapTileLayer: MapTile[], currentLayerIndex: number, indexFirstTile: number, indexLastTile: number, offset_x: number) {
        for (let indexCurrentTile = indexFirstTile; indexCurrentTile < indexLastTile; indexCurrentTile++) {

            let mapTile = mapTileLayer[indexCurrentTile];
            
            if(mapTile){ //if map template smaller than canvas width map tiles not defined -> TODO refactor
                mapTile.xPosCanvas = indexCurrentTile * MapTile.targetSize - offset_x;
                mapTile.yPosCanvas = currentLayerIndex * MapTile.targetSize;
                this.ctx.drawImage(this.currentLevel.map.spriteMap,
                    mapTile.spritePos.getXPosForSpriteWidth(MapTile.sourceSize + 1),
                    mapTile.spritePos.getYPosForSpriteHeight(MapTile.sourceSize + 1),
                    MapTile.sourceSize - 0.8,
                    MapTile.sourceSize - 0.8,
                    mapTile.xPosCanvas - (indexFirstTile * MapTile.targetSize),
                    mapTile.yPosCanvas,
                    MapTile.targetSize,
                    MapTile.targetSize
                );

                if (mapTile.collision) {
                    this.collisionMap.push(mapTile.cloneTile());
                }
            }

        }
    }

    drawCharacters(){
        this.characters.forEach((character) => {
            this.ctx.drawImage(
                character.spriteMap,
                character.spritePos.tileX,
                character.spritePos.tileY,
                character.sourceSize,
                character.sourceSize,
                character.xPos - this.levelPosX,
                character.yPos,
                character.targetSize,
                character.targetSize
            );
        });
    }
}

export default Canvas