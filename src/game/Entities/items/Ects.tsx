import Item from './Item';
import SpritePosition from '../../SpritePosition';
import ectsSpriteImage from '../../images/ectsSprite.jpg';
import Map from '../../Map/Map';

export default class Ects extends Item{
    

    constructor(xPos:number, yPos:number) {
        let spriteMap = new Image();
        spriteMap.src = ectsSpriteImage;
        let spritePos = new SpritePosition(0,0);
        let sourceSize = 16;
        let targetSize = 32;
        let collision = true;
        let isCollected = false;
        super(xPos, yPos, spriteMap, spritePos, sourceSize, targetSize, collision, isCollected);
    }

    public animate(ticks:number){

        if(ticks % 10 === 0){
            
            switch (this.spritePos.tileX){ 
                case 0:
                    this.spritePos.tileX = 1;
                    break;
                case 1:
                    this.spritePos.tileX = 2;
                    break;
                case 2:
                    this.spritePos.tileX = 0;
                    break;
            }

        }

    }

    public handleLevelEdgeCollision(map: Map): void {
        throw new Error("Ects should not be colliding with Level Edge");
    }
    public fellOutOfMap(): void {
        throw new Error("Ects should not fall out of map.");
    }


}