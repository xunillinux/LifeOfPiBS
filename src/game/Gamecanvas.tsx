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
import Ects from './Entities/items/Ects';
import Entity from './Entities/Entity';
import Projectile from './Entities/projectiles/Projectile';
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

    private projectiles: Projectile[] = [];

    private currentEctsScore = 0;

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
        this.updateItems();
        this.updateProjectiles();

        this.drawEntities(this.currentLevel.items);
        this.drawEntities(this.characters);
        this.drawEntities(this.projectiles);
        this.drawUI();
        this.drawControls();

        if (this.player.tookDamage) { this.respawnPlayer() }
        if (this.player.isDead()){ this.gameOver() };
    }


    initializeLevel(){
        this.collisionMap.collisionObjects = [];
        this.player.resetPlayer();
        this.respawnPlayer()
        this.levelPosX = 0;
        this.characters = this.currentLevel.enemies.slice();
        this.characters.push(this.player);

        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.enemies);
        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.items);
        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.map.mapTiles.flat().filter(mapTile => mapTile.collision));
        console.log(this.collisionMap.collisionObjects);
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

            }

        }
    }

    drawEntities(entities: Entity[]){
        entities.forEach(entity => {
            this.ctx.drawImage(
                entity.spriteMap,
                entity.spritePos.getXPosForSpriteWidth(entity.sourceSize),
                entity.spritePos.getYPosForSpriteHeight(entity.sourceSize),
                entity.sourceSize,
                entity.sourceSize,
                entity.xPos - this.levelPosX,
                entity.yPos,
                entity.targetSize,
                entity.targetSize
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

        if (Controls.heldE){
            this.projectiles.push(this.player.shoot());
        }

        //make sure x and y speed is 0 if player practically standing still
        if (Math.abs(this.player.xSpeed) < 0.8) this.player.xSpeed = 0;
        if (Math.abs(this.player.ySpeed) < 0.1) this.player.ySpeed = 0;

        this.player.animate(this.ticks);

        this.player.applyGravity(Config.gravity);

        this.player.updatePos();


        this.checkLevelEdgeCollision(this.player);
        this.updateMapPosition(this.player);

        this.checkPlayerCollisions();

    }

    updateNpc(){
        
        this.currentLevel.enemies.forEach((enemy, index, object) => {

            if(enemy.isDead()){
                object.splice(index, 1);
                this.collisionMap.collisionObjects.splice(this.collisionMap.collisionObjects.findIndex(x => x.id === enemy.id), 1);
                return;
            }

            enemy.animate(this.ticks);
            enemy.move(this.currentLevel.map);
            enemy.applyGravity(Config.gravity);

            this.checkLevelEdgeCollision(enemy);
            this.checkEnemyCollisions(enemy);


        });

    }

    updateItems(){

        this.currentLevel.items.forEach( item => {
            if(item.isCollected){
                if(item instanceof Ects){
                    this.currentEctsScore ++;
                }
            }
            item.animate(this.ticks);
        });

        this.currentLevel.items = this.currentLevel.items.filter(item => !item.isCollected);

    }
    
    updateProjectiles(){
        console.log(this.projectiles);
        this.projectiles.forEach((projectile, index, object) => {

            if(projectile.hasCollided){
                object.splice(index, 1);
                this.collisionMap.collisionObjects.splice(this.collisionMap.collisionObjects.findIndex(x => x.id === projectile.id), 1);
                return;
            }

            projectile.animate(this.ticks);
            projectile.move();

            this.checkLevelEdgeCollision(projectile);
            this.checkProjectileCollisions(projectile);
        });
        
    }


    checkLevelEdgeCollision(entity: Entity){
        entity.handleLevelEdgeCollision(this.currentLevel.map);
        
        // die on level bottom
        if (entity.yPos > this.currentLevel.map.mapHeight - MapTile.targetSize) {
            entity.fellOutOfMap();
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
                let collides = CollisionMap.checkCollision(enemy, collisionObject);
                CollisionMap.processEnemyMapTileCollision(enemy, collisionObject as MapTile, collides);
            }

        });

    }

    checkProjectileCollisions(projectile: Projectile){
        this.collisionMap.collisionObjects.forEach(collisionObject => {
            let collides = CollisionMap.checkCollision(projectile, collisionObject);
            if(collides.doesCollide()){
                if(collisionObject instanceof MapTile){
                    projectile.hasCollided = true;
                }else if(collisionObject instanceof Npc){
                    (collisionObject as Npc).takeDamage();
                    projectile.hasCollided = true;
                }
            }
            
            //only check for collision with MapTiles
            

        });
    }

    endLevel(){
        //TODO implement
    }

    gameOver(){
        //TODO implement
    }

    drawUI(){
        //TODO implement
    }

    drawControls(){
        //TODO implement
    }
}

export default Canvas;