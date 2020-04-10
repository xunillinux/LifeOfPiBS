import Level from './Level';
import Tile from './Tile';
import { TileType } from './TileType';
import TilePosition from './SpritePosition';
import Npc from './Entities/characters/Npc';
import Ects from './Entities/items/Ects';

class Levels {

    static levels: Level[] = [

        new Level("1", "grey", [
            "",
            "",
            "",
        ],
        [new Npc(0, 0, 0, 0, 0)],
        [new Ects(0, 0, 0)],
        ),

        new Level("2", "grey", [
            "",
            "",
            ""
        ],
        [new Npc(0, 0, 0, 0, 0)],
        [new Ects(0, 0, 0)],
        )

    ];


    static tiles: { [id: string]: Tile } = {
        '#' : new Tile(0,0,true,true,false, TileType.DEFAULT),
        'o' : new Tile(0,1,false,false,false, TileType.DEFAULT),
        'x' : new Tile(0,2,true,true,false, TileType.HIDDEN),
        'r' : new Tile(0,3,false,false,false, TileType.HIDDEN),
        'u' : new Tile(0,4,true,false,false, TileType.TRAMPOLINE),
        'k' : new Tile(0,5,true,false,false, TileType.EXIT),
    }

    static getLevelTile(key: string) {
        return Levels.tiles[key];
    }

}

export default Levels;