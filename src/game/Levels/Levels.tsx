import Level from './Level';
import Ects from '../Entities/items/Ects';
import Prof from '../Entities/characters/Prof';
import Map from '../Map/Map';

class Levels {

    static levels: Level[] = [

        new Level("1", "grey", new Map([
            "                                  ",
            "                      #######     ",
            "                                  ",
            "                                  ",
            "##################################",
        ]),
        [new Prof(0, 0)],
        [new Ects(0, 0)],
        ),

        new Level("2", "grey", new Map([
            "",
            "",
            "",
        ]),
        [new Prof(0, 0)],
        [new Ects(0, 0)],
        )

    ];

}

export default Levels;