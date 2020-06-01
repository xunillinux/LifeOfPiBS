import ICollisionObject from "./ICollisionObject";
import Collision from "./Collision";
import Player from "../Entities/characters/Player";
import Npc from "../Entities/characters/Npc";
import MapTile from "../Map/MapTile";
import { MapTileType } from "../Map/MapTileType";
import Item from "../Entities/items/Item";
import SpecialCollisionEvents from "./SpecialCollisionEvents";
import Ects from "../Entities/items/Ects";
import Heart from "../Entities/items/Heart";

export default class CollisionMap{

    private _collisionObjects: ICollisionObject[];
    
    constructor()
    constructor(collisionObjects?: ICollisionObject[]){
        this._collisionObjects = collisionObjects || [];
    }

    public get collisionObjects(): ICollisionObject[] {
        return this._collisionObjects;
    }
    public set collisionObjects(value: ICollisionObject[]) {
        this._collisionObjects = value;
    }

    public static checkCollision(obj1: ICollisionObject, obj2: ICollisionObject) : Collision {

        let collision = new Collision();

        let obj1MiddleX = obj1.xPos + obj1.targetSize/2;
        let obj1MiddleY = obj1.yPos + obj1.targetSize/2;
        let obj1RightX = obj1.xPos + obj1.targetSize;
        let obj1BotY = obj1.yPos + obj1.targetSize;
        let obj2RightX = obj2.xPos + obj2.targetSize;
        let obj2BotY = obj2.yPos + obj2.targetSize;

        // TODO use depth collision check for better efficiency and accuracy
        //below or above object
        if(this.inRange(obj1MiddleX, obj2.xPos - 0.25 * obj2.targetSize, obj2.xPos + 1.25 * obj2.targetSize)){
            
            if(this.inRange(obj1BotY, obj2.yPos, obj2BotY) && obj1.yPos < obj2.yPos){
                collision.bot = true;
            }
            else if(this.inRange(obj1.yPos, obj2.yPos, obj2BotY)){
                collision.top = true;
            }
        }
        
        // TODO use depth collision check for better efficiency and accuracy
        //right or left of object
        if(this.inRange(obj1MiddleY, obj2.yPos - 0.25 * obj2.targetSize, obj2.yPos + 1.25 * obj2.targetSize)){

            if (this.inRange(obj1RightX, obj2.xPos, obj2RightX)) {
                collision.right = true;
            }
            if (this.inRange(obj1.xPos, obj2.xPos, obj2RightX)) {
                collision.left = true;
            }
        }

        return collision;

    }

    public static processPlayerNpcCollision(player: Player, npc: Npc, collides: Collision){

        if (collides.bot) {
            player.yPos = npc.yPos - player.targetSize;
            player.ySpeed = 0;
            npc.takeDamageFrom(player);
            player.smallJump();
        }
        else if (collides.top || collides.right || collides.left) {
            player.takeDamage();
        }

    }

    public static processPlayerMapTileCollision(player: Player, mapTile: MapTile, collides: Collision, specialCollisionEvents: SpecialCollisionEvents){
        
        if (mapTile.solid) {
            if (collides.top) {
                player.yPos = mapTile.yPos + mapTile.targetSize;
                player.ySpeed = 1;
            }
            else if (collides.bot) {
                player.yPos = mapTile.yPos - player.targetSize;
                player.ySpeed = 0;
                player.xSpeed *= mapTile.friction;
            } else if (collides.right) {
                player.xPos = mapTile.xPos - player.targetSize;
                player.xSpeed = 0;
            } else if (collides.left) {
                player.xPos = mapTile.xPos + mapTile.targetSize;
                player.xSpeed = 0;
            }
        }

        
        switch (mapTile.type) {
            case MapTileType.HURTFUL:
                player.takeDamage();
                break;

            case MapTileType.TRAMPOLINE:
                player.bigJump();
                break;

            case MapTileType.EXIT:
                specialCollisionEvents.levelEnd = true;
                break;
            
            default:
                break;
        }
    }

    public static processEnemyMapTileCollision(enemy: Npc, mapTile: MapTile, collides: Collision){
        if (mapTile.solid) {
            if (collides.top) {
                enemy.yPos = mapTile.yPos + mapTile.targetSize;
                enemy.ySpeed = 1;
            }
            else if (collides.bot) {
                enemy.yPos = mapTile.yPos - enemy.targetSize;
                enemy.ySpeed = 0;
            } else if (collides.right) {
                enemy.xPos = mapTile.xPos - enemy.targetSize;
                enemy.switchDirection();
            } else if (collides.left) {
                enemy.xPos = mapTile.xPos + mapTile.targetSize;
                enemy.switchDirection();
            }
        }

        
        switch (mapTile.type) {
            case MapTileType.HURTFUL:
                enemy.takeDamage();
                break;
            default:
                break;
        }
    }


    public static processPlayerItemCollision(player: Player, item: Item, collides: Collision){
        if(item instanceof Ects){
            player.addEcts();
            item.isCollected = true;
        }
        if(item instanceof Heart){
            player.addLife();
            item.isCollected = true;
        }
    }

    

    private static inRange(x:number, min:number, max:number): boolean{
        return x >= min && x <= max;
    }

}