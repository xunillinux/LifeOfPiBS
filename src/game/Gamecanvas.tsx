import React from 'react';
import './Gamecanvas.css';
import gamesketchimg from './images/gamesketchimg.jpg';
import Controls from './Controls';
import Config from './Config';
import Levels from './Levels';
import Level from './Level';
import Npc from './Entities/characters/Npc';
import Ects from './Entities/items/Ects';

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
        let index_x_start = this.levelPosX / Config.mapTileSizeTarget.w
        let offset_x = this.levelPosX % Config.mapTileSizeTarget.w
        // last tile to show
        let index_x_max = index_x_start + Config.mapTileSizeTarget.w + 1
    
        let currentLevelTemplate = this.currentLevel.template;

        for(let i = 0; i < currentLevelTemplate.length-1; i++){
            this.drawLayer(currentLevelTemplate[i], i, index_x_start, index_x_max, offset_x);
        }
        
    }

    drawLayer(currentTemplateLayer: string, index_y: number, index_x_start: number, index_x_max: number, offset_x: number) {

        for (let index_x = index_x_start; index_x < index_x_max; index_x++) {

            let tile = Levels.getLevelTile(currentTemplateLayer.charAt(index_x));
            if (tile) {
                tile.xPos = index_x * Config.mapTileSizeTarget.w - offset_x
                tile.yPos = index_y * Config.mapTileSizeTarget.h

                this.ctx.drawImage(Config.gameTileImagePath,
                    tile.xPos * (Config.mapTileSizeSource.w + 1) + 0.5,
                    tile.yPos * (Config.mapTileSizeSource.h + 1) + 0.5,
                    Config.mapTileSizeSource.w - 0.8,
                    Config.mapTileSizeSource.h - 0.8,
                    tile.xPos - index_x_start * Config.mapTileSizeTarget.w, tile.yPos,
                    Config.mapTileSizeTarget.w, Config.mapTileSizeTarget.h)

                if (tile.collision) {
                    this.collisionMap.push(tile.cloneTile());
                }
            }
        }
    }

}

export default Canvas