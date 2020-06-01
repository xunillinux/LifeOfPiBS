import Item from './Item';
import SpritePosition from '../../SpritePosition';
import heartSpriteImage from '../../images/heartItem.jpg';
import Map from '../../Map/Map';

export default class Heart extends Item{

    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = heartSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 16;
        let targetSize = 32;
        let collision = true;
        let isCollected = false;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision, isCollected);
    }

    public animate(ticks:number){

    }

    public handleLevelEdgeCollision(map: Map): void {
        throw new Error("Heart should not be colliding with Level Edge");
    }
    public fellOutOfMap(): void {
        throw new Error("Heart should not fall out of map.");
    }


}