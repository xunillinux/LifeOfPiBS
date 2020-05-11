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
import Ects from './Entities/items/Ects';
import MapTile from './Map/MapTile';
import SpecialCollisionEvents from './Collision/SpecialCollisionEvents';
import Npc from './Entities/characters/Npc';
import Item from './Entities/items/Item';

interface IGameProps{
}

interface IGameState{
    ticks: number;
    currentLevel: Level;
    levelPosX: number;
    entities: Entity[];
    currentEctsScore: number;
}

export default class Game extends React.Component<IGameProps, IGameState> {

    private ticks: number = 0;
    private currentLevel: Level = Levels.levels[0];
    private levelPosX: number = 0;
    private entities: Entity[] = [];
    private currentEctsScore: number = 0;

    private player: Player = new Player(0,0);
    private characters: Character[] = [];
    private projectiles: Projectile[] = [];
    private collisionMap: CollisionMap = new CollisionMap();

    constructor(props:IGameProps){
        super(props);
        this.state = {
            ticks: 0,
            currentLevel: Levels.levels[0],
            levelPosX: 0,
            entities: [],
            currentEctsScore: 0
        };

        this.gameLoop = this.gameLoop.bind(this);

        this.startGame();
    }

    render(){
        
        return(
            <div className="Game">
            <header className="Game-header">
                <GameUI/>
                <GameCanvas
                    currentLevel = {this.state.currentLevel}
                    ticks = {this.state.ticks}
                    levelPosX = {this.state.levelPosX}
                    entities = {this.state.entities}/>
            </header>
            </div>
        )
    }


    private startGame() {
        //hideMenus();

        Controls.registerKeyEvents()

        this.initializeLevel(this.currentLevel);
        window.clearInterval(Config.gameInterval);
        Config.gameInterval = setInterval(this.gameLoop, 1000 / Config.fps);
    }

    private initializeLevel(level: Level){
        this.currentLevel = level;
        this.collisionMap.collisionObjects = [];
        this.player.resetPlayer();
        this.respawnPlayer()
        this.levelPosX = 0;
        this.characters = this.currentLevel.enemies.slice();
        this.characters.push(this.player);

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

        if (this.player.tookDamage) { this.respawnPlayer() }
        if (this.player.isDead()){ this.gameOver() };
        
        this.updateState();

    }

    updateState(){

        this.entities = [];
        this.entities = this.entities.concat(this.currentLevel.items);
        this.entities = this.entities.concat(this.currentLevel.enemies);
        this.entities = this.entities.concat(this.projectiles);
        this.entities.push(this.player);

        this.setState({
            currentEctsScore: this.currentEctsScore,
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
            enemy.move(this.currentLevel.map);
            enemy.applyGravity(Config.gravity);

            this.checkLevelEdgeCollision(enemy);
            this.checkEnemyCollisions(enemy);

        });

    }

    private updateItems(){

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
                    this.endLevel();
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
            
        });
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

        let currentLevelIndex = Levels.levels.findIndex(l => l.name === this.currentLevel.name);
        if(Levels.levels.length === currentLevelIndex+1){
            this.gameEnd();
        } else{
            this.initializeLevel(Levels.levels[currentLevelIndex+1]);
        }
    }

    private gameOver(){
        //TODO implement
        alert("you lost!");
    }

    private gameEnd(){
        //TODO implement
        alert("you won!");
    }

}
