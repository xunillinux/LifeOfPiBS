import React from 'react';
import './Gamecanvas.css';
import gamesketchimg from './images/gamesketchimg.jpg';
import Controls from './Controls';
import Config from './Config';
import Levels from './Levels/Levels';
import Level from './Levels/Level';
import MapTile from './Map/MapTile';
import Player from './Entities/characters/Player';
import Character from './Entities/characters/Character';
import Item from './Entities/items/Item';
import CollisionMap from './Collision/CollisionMap';
import Npc from './Entities/characters/Npc';
import SpecialCollisionEvents from './Collision/SpecialCollisionEvents';

class Canvas extends React.Component {

    private gameCanvasRef: any;
    private gameSketchImgRef: any;
    private ctx: any;

    private ticks: number = 0;

    private currentLevel: Level = Levels.levels[0];
    // current map position
    private levelPosX: number = 0;

    private collisionMap: CollisionMap = new CollisionMap();

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
        this.characters = this.currentLevel.enemies.slice();
        this.characters.push(this.player);

        this.drawLevel();

        this.updatePlayer();
        this.updateNpc();

        //TODO remove afer demo
        this.animateECTS();

        this.drawItems();
        this.drawCharacters();
        //this.drawUI();
        //drawControls();

        if (this.player.tookDamage) { this.respawnPlayer() }
        //if (this.player.isDead()){ gameOver() };
    }

    //TODO remove afer demo
    animateECTS(){
        this.currentLevel.items.forEach( item => {

            if(this.ticks % 10 === 0){
                
                switch (item.spritePos.tileX){ 
                    case 0:
                        item.spritePos.tileX = 1;
                        break;
                    case 1:
                        item.spritePos.tileX = 2;
                        break;
                    case 2:
                        item.spritePos.tileX = 0;
                        break;
                }

            }

        });
    }

    initializeLevel(){
        this.collisionMap.collisionObjects = [];
        this.player.resetPlayer();
        this.respawnPlayer()
        this.levelPosX = 0;
        this.characters = this.currentLevel.enemies.slice();
        this.characters.push(this.player);

        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.enemies);
        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.map.mapTiles.flat().filter(mapTile => mapTile.collision));

    }

    public respawnPlayer(){
        this.player.xPos = 0;
        this.player.yPos = this.currentLevel.map.getGroundLevel()-10;
        this.player.xSpeed = 0;
        this.player.ySpeed = 0;
        this.player.tookDamage = false;
        this.levelPosX = 0;
    }


    drawLevel() {

        this.ctx.clearRect(0, 0, Config.canvasSize.w, Config.canvasSize.h);
        if (this.levelPosX < 0) {
            this.levelPosX = 0;
        }
        this.levelPosXStart = this.levelPosX;
        // first tile to display:
        let indexFirstTile = Math.trunc(this.levelPosX / MapTile.targetSize);
        let offset_x = this.levelPosX % MapTile.targetSize;

        // last tile to show
        let indexLastTile = indexFirstTile + this.currentLevel.map.numberOfDisplayedTilesWidth;
    
        let currentLevelMapTiles = this.currentLevel.map.mapTiles;

        currentLevelMapTiles.forEach((mapTileLayer, index) => {
            this.drawLayer(mapTileLayer, index, indexFirstTile, indexLastTile, offset_x);
        });
        
    }

    drawLayer(mapTileLayer: MapTile[], currentLayerIndex: number, indexFirstTile: number, indexLastTile: number, offset_x: number) {
        for (let indexCurrentTile = indexFirstTile; indexCurrentTile < indexLastTile; indexCurrentTile++) {

            let mapTile = mapTileLayer[indexCurrentTile];
            
            if(mapTile){ //if map template smaller than canvas width map tiles not defined -> TODO refactor
                mapTile.xPos = indexCurrentTile * MapTile.targetSize - offset_x;
                mapTile.yPos = currentLayerIndex * MapTile.targetSize;
                this.ctx.drawImage(this.currentLevel.map.spriteMap,
                    mapTile.spritePos.getXPosForSpriteWidth(MapTile.sourceSize + 1),
                    mapTile.spritePos.getYPosForSpriteHeight(MapTile.sourceSize + 1),
                    MapTile.sourceSize - 0.8,
                    MapTile.sourceSize - 0.8,
                    mapTile.xPos - (indexFirstTile * MapTile.targetSize),
                    mapTile.yPos,
                    MapTile.targetSize,
                    MapTile.targetSize
                );

            }

        }
    }

    drawCharacters(){
        this.characters.forEach((character) => {
            this.ctx.drawImage(
                character.spriteMap,
                character.spritePos.getXPosForSpriteWidth(character.sourceSize),
                character.spritePos.getYPosForSpriteHeight(character.sourceSize),
                character.sourceSize,
                character.sourceSize,
                character.xPos - this.levelPosX,
                character.yPos,
                character.targetSize,
                character.targetSize
            );
        });
    }

    drawItems(){
        this.currentLevel.items.forEach((item) => {
            this.ctx.drawImage(
                item.spriteMap,
                item.spritePos.getXPosForSpriteWidth(item.sourceSize),
                item.spritePos.getYPosForSpriteHeight(item.sourceSize),
                item.sourceSize,
                item.sourceSize,
                item.xPos - this.levelPosX,
                item.yPos,
                item.targetSize,
                item.targetSize
            );
        });
    }

    

    updatePlayer(){

        if(Controls.heldRight){
            this.player.accelerateRight();
        }
        if (Controls.heldLeft){
            this.player.accelerateLeft();
        }

        if (Controls.heldUp){
            this.player.jump();
        }

        this.player.animate();

        this.player.applyGravity(Config.gravity);

        this.player.updatePos();


        this.checkLevelEdgeCollision(this.player);
        this.updateMapPosition(this.player);

        this.checkPlayerCollisions();

    }

    updateNpc(){

        
        this.currentLevel.enemies.forEach((enemy, index) => {

            if(enemy.isDead()){
                delete this.currentLevel.enemies[index];
                return;
            }

            enemy.animate(this.ticks);
            enemy.move(this.levelPosX, this.currentLevel.map);
            enemy.applyGravity(Config.gravity);

            this.checkLevelEdgeCollision(enemy);
            this.checkEnemyCollisions(enemy);


        });

    }


    checkLevelEdgeCollision(character: Character){
        character.handleLevelEdgeCollision(this.currentLevel.map);
        
        // die on level bottom
        if (character.yPos > this.currentLevel.map.mapHeight - MapTile.targetSize) {
            character.fellOutOfMap();
        }
    }

    updateMapPosition(player: Player){
        // move the player when the level is at it's border, else move the level
        if (this.levelPosX <= 0) {
            if (player.xPos > (Config.canvasSize.w / 2)) {
                this.levelPosX = 1;
            }
        } else if (this.levelPosX >= this.currentLevel.map.mapWidth - Config.canvasSize.w && this.currentLevel.map.mapWidth > Config.canvasSize.w) {
            this.levelPosX = this.currentLevel.map.mapWidth - Config.canvasSize.w;
            if (player.xPos < this.currentLevel.map.mapWidth - (Config.canvasSize.w / 2)) {
                this.levelPosX = this.currentLevel.map.mapWidth - Config.canvasSize.w - 1;
            }
        } else if (this.currentLevel.map.mapWidth > Config.canvasSize.w) {
            this.levelPosX += player.xSpeed;
        }
    }

    checkPlayerCollisions(){
        this.collisionMap.collisionObjects.forEach(collisionObject => {
            
            let collides = CollisionMap.checkCollision(this.player, collisionObject);

            if(collides.doesCollide()){
                let specialCollisionEvent = new SpecialCollisionEvents();

                if (collisionObject instanceof Npc){
                    CollisionMap.processPlayerNpcCollision(this.player, collisionObject as Npc, collides);
                }
                else if (collisionObject instanceof MapTile){
                    CollisionMap.processPlayerMapTileCollision(this.player, collisionObject as MapTile, collides, specialCollisionEvent);
                }
                else if (collisionObject instanceof Item){
                    CollisionMap.processPlayerItemCollision(this.player, collisionObject as Item, collides);
                }
                if(specialCollisionEvent.levelEnd){
                    this.endLevel();
                }
            }

        });

    }

    checkEnemyCollisions(enemy: Npc){
            
        this.collisionMap.collisionObjects.forEach(collisionObject => {
            
            //only check for collision with MapTiles
            if(collisionObject instanceof MapTile){
                console.log(collisionObject);

                let collides = CollisionMap.checkCollision(enemy, collisionObject);

                CollisionMap.processEnemyMapTileCollision(enemy, collisionObject as MapTile, collides);
            }

        });

    }

    endLevel(){
        //TODO implement
    }
}

export default Canvas;