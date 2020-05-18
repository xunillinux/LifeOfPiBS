import Level from './Level';
import Ects from '../Entities/items/Ects';
import Prof from '../Entities/characters/Prof';
import Map from '../Map/Map';
import MapTile from '../Map/MapTile';

class Levels {

    static levels: Level[] = [

        new Level("1", "grey", new Map([
            "  .                             .                        .                             ",
            "    .                                          .                                       ",
            "         .                          .                     .                            ",
            "                                .                        .                             ",
            "        @@##@##                                  @@##@##@@##@##    .  @@##@##@@##@##   ",
            "                    .         ##@#####@@         .         .          .         .      ",
            "   .                                .                 .                                ",
            "                                                                                       ",
            "##@@##@##@##############@@@@##       ##@#######@@##@##@@##@##@@##@#      #@@###########",
        ]),
        [
            new Prof( Levels.getCoordinateForRelativeMapPos(33), Levels.getCoordinateForRelativeMapPos(4) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(45), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(54), Levels.getCoordinateForRelativeMapPos(3) )
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(1) )
        ],
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

    private static getCoordinateForRelativeMapPos(relativeMapPos: number): number{
        return MapTile.targetSize * relativeMapPos;
    }

}

export default Levels;