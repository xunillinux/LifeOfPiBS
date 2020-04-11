import Level from './Level';
import MapTile from './MapTile';
import { MapTileType } from './MapTileType';
import Ects from './Entities/items/Ects';
import Prof from './Entities/characters/Prof';

class Levels {

    static levels: Level[] = [

        //TODO create new class "MAP" which contains a template with MapTiles instead of level.template
        new Level("1", "grey", [
            "",
            "",
            "",
        ],
        [new Prof(0, 0)],
        [new Ects(0, 0)],
        ),

        new Level("2", "grey", [
            "",
            "",
            ""
        ],
        [new Prof(0, 0)],
        [new Ects(0, 0)],
        )

    ];

    //TODO use SpritePosition instead of xPos and yPos for MapTile to make clear it is not coordinates but the relative position of the sprite in the image
    static tiles: { [id: string]: MapTile } = {
        '#' : new MapTile(0,0,true,true,false, MapTileType.DEFAULT),
        'o' : new MapTile(0,1,false,false,false, MapTileType.DEFAULT),
        'x' : new MapTile(0,2,true,true,false, MapTileType.HIDDEN),
        'r' : new MapTile(0,3,false,false,false, MapTileType.HIDDEN),
        'u' : new MapTile(0,4,true,false,false, MapTileType.TRAMPOLINE),
        'k' : new MapTile(0,5,true,false,false, MapTileType.EXIT),
    }

    static getLevelTile(key: string) {
        return Levels.tiles[key];
    }

}

export default Levels;