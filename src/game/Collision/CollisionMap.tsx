import ICollisionObject from "./ICollisionObject";
import Collision from "./Collision";
import Player from "../Entities/characters/Player";
import Npc from "../Entities/characters/Npc";
import MapTile from "../Map/MapTile";

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

        // TODO make better
        //below or above object
        //if(this.inRange(obj1.xPos, obj2.xPos, obj2RightX) || this.inRange(obj1RightX, obj2.xPos, obj2RightX)){
        if(this.inRange(obj1MiddleX, obj2.xPos - 0.25 * obj2.targetSize, obj2.xPos + 1.25 * obj2.targetSize)){
            
            if(this.inRange(obj1BotY, obj2.yPos, obj2BotY) && obj1.yPos < obj2.yPos){
                collision.bot = true;
            }
            else if(this.inRange(obj1.yPos, obj2.yPos, obj2BotY)){
                collision.top = true;
            }
        }
        
        // TODO make better
        //right or left of object
        //if(this.inRange(obj1.yPos, obj2.yPos, obj2BotY) || this.inRange(obj1BotY, obj2.yPos, obj2BotY)){
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

        console.log(collides);
        if (collides.bot) {
            player.yPos = npc.yPos - player.targetSize;
            player.ySpeed = 0;
            npc.takeDamage();
            player.smallJump();
        }
        else if (collides.top || collides.right || collides.left) {
            player.takeDamage();
        }

    }

    public static processPlayerMapTileCollision(player: Player, mapTile: MapTile, collides: Collision){
        
        if (mapTile.solid) {
            if (collides.top) {
                player.yPos = mapTile.yPos + mapTile.targetSize;
                player.ySpeed = 1;
            }
            else if (collides.bot) {
                //TODO apply friction of that mapTile type
                player.yPos = mapTile.yPos - player.targetSize;
                player.ySpeed = 0;
            } else if (collides.right) {
                player.xPos = mapTile.xPos - player.targetSize;
                player.xSpeed = 0;
            } else if (collides.left) {
                player.xPos = mapTile.xPos + mapTile.targetSize;
                player.xSpeed = 0;
            }
        }

        /*
        TODO check all maptiletypes
        if (object.deadly == true) {
                    //items.push({ sx:, sy:9, x:actor.pos.x, y:actor.pos.y, deadly:false, type:'looser' });
                    gameOver()
                }
                if (object.type == 'exit') {
                    levelWin()
                }
                if (object.type == 'trampoline') {
                    actor.speed.y < 0 ? actor.speed.y = 0 : true
                    sound_jump()
                    actor.speed.y = -0.5 * actor.speed.y - 25
                }
        */

    }

    public static processPlayerItemCollision(player: Player, npc: Item, collides: Collision){
        /*
        if (object.type == 'coin') {
                items.splice(items.indexOf(object), 1)
                score++
                sound_coin()
        }
        */
    }

    

    private static inRange(x:number, min:number, max:number): boolean{
        return x >= min && x <= max;
    }

}