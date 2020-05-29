import React from 'react';
import './Game.css';
import GameCanvas from './Gamecanvas';
import GameUI from './GameUI';
import Controls from './Controls';
import Level from './Levels/Level';
import Levels from './Levels/Levels';
import CollisionMap from './Collision/CollisionMap';
import Entity from './Entities/Entity';
import Player from './Entities/characters/Player';
import Character from './Entities/characters/Character';
import Projectile from './Entities/projectiles/Projectile';
import Config from './Config';
import MapTile from './Map/MapTile';
import SpecialCollisionEvents from './Collision/SpecialCollisionEvents';
import Npc from './Entities/characters/Npc';
import Item from './Entities/items/Item';
import { MapTileType } from './Map/MapTileType';
import GameMenu, { GameMenuType } from './GameMenu';

interface IGameProps{
}

interface IGameState{
    canvasWidth: number;
    canvasHeight: number;
    ticks: number;
    currentLevel: Level;
    levelPosX: number;
    entities: Entity[];
    currentEctsScore: number;
    showGameMenu: boolean;
    gameMenuType: GameMenuType;
}

export default class Game extends React.Component<IGameProps, IGameState> {
    private ticks: number = 0;
    private currentLevel: Level = Levels.levels[0];
    private levelPosX: number = 0;
    private entities: Entity[] = [];

    private player: Player = new Player(0,0);
    private characters: Character[] = [];
    private projectiles: Projectile[] = [];
    private collisionMap: CollisionMap = new CollisionMap();

    constructor(props:IGameProps){
        super(props);
        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            ticks: 0,
            currentLevel: Levels.levels[0],
            levelPosX: 0,
            entities: [],
            currentEctsScore: 0,
            showGameMenu: true,
            gameMenuType: GameMenuType.START
        };

        this.gameLoop = this.gameLoop.bind(this);
        this.onGameNextLevelHandler = this.onGameNextLevelHandler.bind(this);
        this.onGameRestartHandler = this.onGameRestartHandler.bind(this);
        this.onGameResumeHandler = this.onGameResumeHandler.bind(this);
        this.onGameStartHandler = this.onGameStartHandler.bind(this);
    }

    render(){
        if(this.state.showGameMenu){
            return(
                <div id="gameDiv" className={`Game col-lg-12`}>
                    <GameMenu
                        show = {this.state.showGameMenu}
                        gameMenuType = {this.state.gameMenuType}
                        currentEctsScore = {this.state.currentEctsScore}
                        currentLevelName = {this.state.currentLevel.name}
                        currentLives = {this.player.lives}
                        maxLives = {this.player.maxLives}
                        onGameNextLevelHandler = {this.onGameNextLevelHandler}
                        onGameRestartHandler = {this.onGameRestartHandler}
                        onGameResumeHandler = {this.onGameResumeHandler}
                        onGameStartHandler = {this.onGameStartHandler} />
                </div>
            )
        }else{
            return(
                <div id="gameDiv" className={`Game col-lg-12`}>
                    <GameUI
                        currentEctsScore = {this.state.currentEctsScore}
                        currentLevelName = {this.state.currentLevel.name}
                        currentLives = {this.player.lives}
                        maxLives = {this.player.maxLives}/>
                    <GameCanvas
                        canvasWidth = {this.state.canvasWidth}
                        canvasHeight = {this.state.canvasHeight}
                        currentLevel = {this.state.currentLevel}
                        ticks = {this.state.ticks}
                        levelPosX = {this.state.levelPosX}
                        entities = {this.state.entities} />
                </div>
            )
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    onGameStartHandler(){
        this.setState({showGameMenu: false})
        this.startNewGame();
    }
    onGameResumeHandler(){
        this.setState({showGameMenu: false})
        this.startGameLoop();
    }
    onGameNextLevelHandler(){
        this.setState({showGameMenu: false})
        this.endLevel();
    }
    onGameRestartHandler(){
        this.setState({showGameMenu: false})
        this.startNewGame();
    }

    private startNewGame() {
        Controls.registerKeyEvents()
        this.initializeLevel(Levels.levels[0]);
        this.startGameLoop();
    }

    private initializeLevel(level: Level){
        this.currentLevel = level;
        this.collisionMap.collisionObjects = [];
        this.player.resetPlayer();
        this.respawnPlayer()
        this.levelPosX = 0;
        console.log(this.currentLevel);

        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.enemies);
        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.items);
        this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(this.currentLevel.map.mapTiles.flat().filter(mapTile => mapTile.collision));
    }

    private gameLoop() {
        
        this.ticks++;
        this.characters = this.currentLevel.enemies.slice();
        this.characters.push(this.player);

        this.updatePlayer();
        this.updateNpc();
        this.updateItems();
        this.updateProjectiles();

        this.checkEctsRequirement();

        if (this.player.tookDamage) { this.respawnPlayer() }
        if (this.player.isDead()){ this.gameOver() };
        
        this.updateState();
        this.checkIfPausedEvent();
    }

    private checkIfPausedEvent(){
        if(Controls.Escape){
            this.pauseGameLoop();
            this.setState({showGameMenu: true, gameMenuType: GameMenuType.PAUSE});
        } 
    }

    private pauseGameLoop(){
        clearInterval(Config.gameInterval);
    }

    private startGameLoop(){
        clearInterval(Config.gameInterval);
        Config.gameInterval = setInterval(this.gameLoop, 1000 / Config.fps);
    }

    private updateState(){

        this.entities = [];
        this.entities = this.entities.concat(this.currentLevel.items);
        this.entities = this.entities.concat(this.currentLevel.enemies);
        this.entities = this.entities.concat(this.projectiles);
        this.entities.push(this.player);

        this.setState({
            currentEctsScore: this.player.ects,
            currentLevel: this.currentLevel,
            entities: this.entities,
            levelPosX: this.levelPosX,
            ticks: this.ticks
        });
    }

    private updatePlayer(){

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
            let projectile = this.player.shoot();
            if(projectile){
                this.projectiles.push(projectile);
            }
        }

        //make sure x and y speed is 0 if player practically standing still
        if (Math.abs(this.player.xSpeed) < 0.8) this.player.xSpeed = 0;
        if (Math.abs(this.player.ySpeed) < 0.1) this.player.ySpeed = 0;

        this.player.animate(this.ticks);

        this.player.applyGravity(Config.gravity);

        this.player.updatePos();
        this.player.updateShootCooldown();

        this.checkLevelEdgeCollision(this.player);
        this.updateMapPosition(this.player);

        this.checkPlayerCollisions();

    }

    private updateNpc(){
        
        this.currentLevel.enemies.forEach((enemy, index, object) => {

            if(enemy.isDead()){
                object.splice(index, 1);
                this.collisionMap.collisionObjects.splice(this.collisionMap.collisionObjects.findIndex(x => x.id === enemy.id), 1);
                return;
            }

            enemy.animate(this.ticks);
            let projectilesArray = enemy.update(this.currentLevel.map);
            if(projectilesArray){
                this.projectiles = this.projectiles.concat(projectilesArray);
            }
            enemy.applyGravity(Config.gravity);

            this.checkLevelEdgeCollision(enemy);
            this.checkEnemyCollisions(enemy);

        });

    }

    private updateItems(){

        this.currentLevel.items.forEach( item => {
            if(item.isCollected){
                this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.filter(i => i.id !== item.id);
            }
            item.animate(this.ticks);
        });

        this.currentLevel.items = this.currentLevel.items.filter(item => !item.isCollected);

    }
    
    private updateProjectiles(){
        this.projectiles.forEach((projectile, index, object) => {

            if(projectile.shouldBeDestroyed()){
                object.splice(index, 1);
                
                let collisionMapProjectileIndex = this.collisionMap.collisionObjects.findIndex(x => x.id === projectile.id);

                if( collisionMapProjectileIndex !== -1){
                    this.collisionMap.collisionObjects.splice(collisionMapProjectileIndex, 1);
                }
                
                return;
            }

            projectile.animate(this.ticks);
            projectile.move();

            this.checkLevelEdgeCollision(projectile);
            this.checkProjectileCollisions(projectile);
        });
        
    }
    
    private checkLevelEdgeCollision(entity: Entity){
        entity.handleLevelEdgeCollision(this.currentLevel.map);
        
        // die on level bottom
        if (entity.yPos > this.currentLevel.map.mapHeight - MapTile.targetSize) {
            entity.fellOutOfMap();
        }
    }

    private updateDimensions() {
        //TODO fix
        Config.canvasSize.w = document.getElementById("gameCanvas")?.offsetWidth;
        Config.canvasSize.h = window.innerHeight-56;
        this.centerLevelPosX();

        this.setState({ canvasWidth: window.innerWidth, canvasHeight: Config.canvasSize.h});
    }

    private centerLevelPosX(){
        
        // no centering needed
        if(this.state.canvasWidth > this.currentLevel.map.mapWidth){
            return;
        }

        this.levelPosX = this.player.xPos + this.state.canvasWidth/2;
        
        //if player near end of level set levelPosX to max
        if(this.levelPosX >= this.currentLevel.map.mapWidth - Config.canvasSize.w && this.currentLevel.map.mapWidth > Config.canvasSize.w){
            this.levelPosX = this.currentLevel.map.mapWidth - Config.canvasSize.w;
        }
        
    }

    private checkEctsRequirement(){
        if(this.state.currentEctsScore >= this.currentLevel.requiredEcts && !this.currentLevel.exitIsOpen){
            this.openLevelExit();
        }
    }

    private openLevelExit(){
        this.currentLevel.map.mapTiles.forEach(layer => {
            layer = layer.map(mapTile => mapTile.type === MapTileType.CLOSEDEXIT ? mapTile.replaceWithOpenExitMapTile() : mapTile);
            this.collisionMap.collisionObjects = this.collisionMap.collisionObjects.concat(layer.filter(mapTile => mapTile.type === MapTileType.EXIT));
        });
        this.currentLevel.exitIsOpen = true;
    }

    private updateMapPosition(player: Player){
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

    private checkPlayerCollisions(){
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
                    this.showNextLevelMenu();
                }
            }

        });

    }

    private checkEnemyCollisions(enemy: Npc){
        this.collisionMap.collisionObjects.forEach(collisionObject => {
            
            //only check for collision with MapTiles
            if(collisionObject instanceof MapTile){
                let collides = CollisionMap.checkCollision(enemy, collisionObject);
                CollisionMap.processEnemyMapTileCollision(enemy, collisionObject as MapTile, collides);
            }

        });

    }

    private checkProjectileCollisions(projectile: Projectile){

        this.collisionMap.collisionObjects.concat(this.player).forEach(collisionObject => {
            let collides = CollisionMap.checkCollision(projectile, collisionObject);
            if(collides.doesCollide()){
                if(collisionObject instanceof MapTile){
                    projectile.hasCollided = true;
                }else if(collisionObject instanceof Npc){
                    if(projectile.owner instanceof Npc){
                        return;
                    }
                    (collisionObject as Npc).takeDamageFrom(projectile.owner);
                    projectile.hasCollided = true;
                }else if(collisionObject instanceof Player){
                    if(projectile.owner instanceof Player){
                        return;
                    }
                    collisionObject.takeDamageFrom(projectile.owner);
                    projectile.hasCollided = true;
                }
            }
            
        });
    }

    private showNextLevelMenu(){
        this.pauseGameLoop();
        if(Levels.nextLevelExists(this.currentLevel)){
            this.setState({showGameMenu: true, gameMenuType: GameMenuType.NEXTLEVEL});
        }else{
            this.setState({showGameMenu: true, gameMenuType: GameMenuType.WIN});
        }
    }

    private respawnPlayer(){
        this.player.xPos = 0;
        this.player.yPos = this.currentLevel.map.getGroundLevel()-10;
        this.player.xSpeed = 0;
        this.player.ySpeed = 0;
        this.player.tookDamage = false;
        this.levelPosX = 0;
    }

    private endLevel(){

        let nextLevel = Levels.getNextLevel(this.currentLevel);
        if(nextLevel){
            this.initializeLevel(nextLevel);
        } else{
            this.gameEnd();
        }
    }

    private gameOver(){
        this.pauseGameLoop();
        this.setState({showGameMenu: true, gameMenuType: GameMenuType.LOOSE});
    }

    private gameEnd(){
        this.pauseGameLoop();
        this.setState({showGameMenu: true, gameMenuType: GameMenuType.WIN});
    }

}
