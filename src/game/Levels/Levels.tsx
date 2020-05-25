import Level from './Level';
import Ects from '../Entities/items/Ects';
import Prof from '../Entities/characters/Prof';
import Map from '../Map/Map';
import MapTile from '../Map/MapTile';
import Transferpaper from '../Entities/characters/Transferpaper';

class Levels {

    static levels: Level[] = [

        new Level("1", "grey", 5, new Map([
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
            new Prof( Levels.getCoordinateForRelativeMapPos(54), Levels.getCoordinateForRelativeMapPos(3) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(1) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(30), Levels.getCoordinateForRelativeMapPos(2) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(80), Levels.getCoordinateForRelativeMapPos(3) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(45), Levels.getCoordinateForRelativeMapPos(1) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(60), Levels.getCoordinateForRelativeMapPos(1) )
        ]
        ),

        new Level("1: Boss", "grey", 10, new Map([
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

        ]
        ),

        new Level("2", "grey", 15, new Map([
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
            new Prof( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(20), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(11), Levels.getCoordinateForRelativeMapPos(3) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(31), Levels.getCoordinateForRelativeMapPos(4) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(43), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(58), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(74), Levels.getCoordinateForRelativeMapPos(3) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(76), Levels.getCoordinateForRelativeMapPos(7) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(3) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(25), Levels.getCoordinateForRelativeMapPos(2) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(66), Levels.getCoordinateForRelativeMapPos(1) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(42), Levels.getCoordinateForRelativeMapPos(4) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(75), Levels.getCoordinateForRelativeMapPos(2) ),
        ]
        ),

        new Level("2: Boss", "grey", 20, new Map([
            "  .                            ",
            "    .                          ",
            "         .                     ",
            "                               ",
            "                               ",
            "                 .      .      ",
            "   .                           ",
            "                            E  ",
            "##@@##@##@#####################",
        ]),
        [
            new Transferpaper( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(6) ),
        ],
        [

        ]
        ),

    ];

    private static getCoordinateForRelativeMapPos(relativeMapPos: number): number{
        return MapTile.targetSize * relativeMapPos;
    }

}

export default Levels;