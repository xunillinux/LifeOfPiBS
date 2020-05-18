import Level from './Level';
import Ects from '../Entities/items/Ects';
import Prof from '../Entities/characters/Prof';
import Map from '../Map/Map';
import MapTile from '../Map/MapTile';
import Transferpaper from '../Entities/characters/Transferpaper';

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
            "                                                                                    E  ",
            "##@@##@##@##############@@@@##       ##@#######@@##@##@@##@##@@##@#      #@@###########",
        ]),
        [
            new Prof( Levels.getCoordinateForRelativeMapPos(33), Levels.getCoordinateForRelativeMapPos(4) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(45), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(54), Levels.getCoordinateForRelativeMapPos(3) )
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(1) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(30), Levels.getCoordinateForRelativeMapPos(4) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(32), Levels.getCoordinateForRelativeMapPos(4) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(35), Levels.getCoordinateForRelativeMapPos(4) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(60), Levels.getCoordinateForRelativeMapPos(1) )
        ],
        5
        ),

        new Level("1: Boss", "grey", new Map([
            "  .                             .                      ",
            "    .                                                  ",
            "         .                                             ",
            "                                .                      ",
            "        @@##@##                   ##@##########        ",
            "                    .      .          .         .      ",
            "   .                         .                         ",
            "                                                    E  ",
            "##@@##@##@########@##@@#@##############################",
        ]),
        [
            new Transferpaper( Levels.getCoordinateForRelativeMapPos(33), Levels.getCoordinateForRelativeMapPos(4) ),
        ],
        [
        ],
        5
        ),

        new Level("2", "grey", new Map([
            "  .                             .                        .                             ",
            "    .                                          .                                       ",
            "         .                          .                     .                            ",
            "                                .                        .                             ",
            "        @@##@##                                  @@##@##@@##@##    .  @@##@##@@##@##   ",
            "                    .         ##@#####@@         .         .          .         .      ",
            "   .                                .                 .                                ",
            "                                                                                    E  ",
            "##@@##@##@##############@@@@##       ##@#######@@##@##@@##@##@@##@#      #@@###########",
        ]),
        [],
        [new Ects(0, 0)],
        10
        )

    ];

    private static getCoordinateForRelativeMapPos(relativeMapPos: number): number{
        return MapTile.targetSize * relativeMapPos;
    }

}

export default Levels;