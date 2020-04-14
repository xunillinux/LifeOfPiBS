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

    private enemies: Npc[] = [];
    private items: Ects[] = [];

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
        //initializeLevel()
        window.clearInterval(Config.gameInterval);
        Config.gameInterval = setInterval(this.gameLoop, 1000 / Config.fps);
    }

    gameLoop() {
        this.ticks++;
        this.drawLevel();
        //updateCharacters();
        //updateElements();
        //drawElements();
        //drawActors();
        //drawControls();
    }

    initializeLevel(){
        //current_level.width = current_level.level[0].length * size.tile.target.w;
        //items = []
        this.enemies = this.currentLevel.enemies; //Levels.getEnemiesForLevel(this.currentLevel);
        //this.items = Levels.getItemsForLevel(this.currentLevel);
        //collisionMap = []
        //actors = [player];
        //resetPlayer()
        //scroll_x = player.pos.x - (document.documentElement.clientWidth - 4) / 2
        //theme = current_level.theme
    }



    drawLevel() {

        // clear the canvas before repainting
        this.ctx.clearRect(0, 0, Config.canvasSize.w, Config.canvasSize.h);
        this.collisionMap = [];
    
        if (this.levelPosX < 0) {
            this.levelPosX = 0;
        }
        this.levelPosXStart = this.levelPosX;
        // first tile to display:
        let index_x_start = this.levelPosX / this.currentLevel.map.targetSize
        let offset_x = this.levelPosX % this.currentLevel.map.targetSize
        // last tile to show
        let index_x_max = index_x_start + this.currentLevel.map.targetSize + 1
    
        let currentLevelMapTiles = this.currentLevel.map.mapTiles;

        currentLevelMapTiles.forEach((mapTileLayer, index) => {
            this.drawLayer(mapTileLayer, index, index_x_start, index_x_max, offset_x);
        });
        
    }

    drawLayer(mapTileLayer: MapTile[], index_y: number, index_x_start: number, index_x_max: number, offset_x: number) {

        for (let index_x = index_x_start; index_x < index_x_max; index_x++) {

            let mapTile = mapTileLayer[index_x];
            mapTile.xPosCanvas = index_x * this.currentLevel.map.targetSize - offset_x
            mapTile.yPosCanvas = index_y * this.currentLevel.map.targetSize

            this.ctx.drawImage(this.currentLevel.map.spriteMap.src,
                mapTile.xPosCanvas * (this.currentLevel.map.targetSize + 1) + 0.5,
                mapTile.yPosCanvas * (this.currentLevel.map.targetSize + 1) + 0.5,
                this.currentLevel.map.targetSize - 0.8,
                this.currentLevel.map.targetSize - 0.8,
                mapTile.xPosCanvas - index_x_start * this.currentLevel.map.targetSize, mapTile.yPosCanvas,
                this.currentLevel.map.targetSize, this.currentLevel.map.targetSize)

            if (mapTile.collision) {
                this.collisionMap.push(mapTile.cloneTile());
            }
        }
    }

}

export default Canvas