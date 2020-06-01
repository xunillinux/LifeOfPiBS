import Level from './Level';
import Ects from '../Entities/items/Ects';
import Prof from '../Entities/characters/Prof';
import Map from '../Map/Map';
import MapTile from '../Map/MapTile';
import Transferpaper from '../Entities/characters/Transferpaper';
import Bachelorthesis from '../Entities/characters/Bachelorthesis';

class Levels {

    private static levels: Level[] = [

        new Level("1", "grey", 5, new Map([
            "                                                                                       ",
            "                                                                                       ",
            "                                                                                       ",
            "  .                             .                        .                             ",
            "                 .                             .                                       ",
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
            new Prof( Levels.getCoordinateForRelativeMapPos(33), Levels.getCoordinateForRelativeMapPos(8) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(45), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(54), Levels.getCoordinateForRelativeMapPos(7) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(5) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(30), Levels.getCoordinateForRelativeMapPos(6) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(80), Levels.getCoordinateForRelativeMapPos(7) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(45), Levels.getCoordinateForRelativeMapPos(5) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(60), Levels.getCoordinateForRelativeMapPos(5) )
        ]
        ),

        new Level("1: Boss - Transferpaper", "grey", 10, new Map([
            "                                         ",
            "                                         ",
            "                                         ",
            "                                         ",
            "       .                                 ",
            "              .                          ",
            "         .                               ",
            "                                         ",
            "                                         ",
            "                 .           .           ",
            "   .                                     ",
            "                                      E  ",
            "##@@##@##@###############################",
        ]),
        [
            new Transferpaper( Levels.getCoordinateForRelativeMapPos(20), Levels.getCoordinateForRelativeMapPos(8) ),
        ],
        [

        ]
        ),

        new Level("2", "grey", 15, new Map([
            "                                                                                       ",
            "                                                                                       ",
            "                                                                                       ",
            "                                                                                       ",
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
            new Prof( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(20), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(11), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(31), Levels.getCoordinateForRelativeMapPos(8) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(43), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(58), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(74), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(76), Levels.getCoordinateForRelativeMapPos(11) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(7) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(25), Levels.getCoordinateForRelativeMapPos(6) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(66), Levels.getCoordinateForRelativeMapPos(5) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(42), Levels.getCoordinateForRelativeMapPos(8) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(75), Levels.getCoordinateForRelativeMapPos(6) ),
        ]
        ),

        

        new Level("2: Boss - Transferpaper", "grey", 20, new Map([
            "                                                       ",
            "                                                       ",
            "                                                       ",
            "                                                       ",
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
            new Transferpaper( Levels.getCoordinateForRelativeMapPos(33), Levels.getCoordinateForRelativeMapPos(10) ),
        ],
        [

        ]
        ),
        new Level("3", "grey", 25, new Map([
            "                                                                                       ",
            "                                                                                       ",
            "                                                                                       ",
            "                                                                                       ",
            "  .                             .                        .        ####                 ",
            "    .          ######                   ####             .                             ",
            "         .                          .                     .                            ",
            "                                .                        .                             ",
            "        @@##@##                                  @@##@##@@##@##    .  @@##@   @##@##   ",
            "                    .         ##@#####@@         .         .          .         .      ",
            "   .               ####             .                 .                                ",
            "                                                                                    E  ",
            "##@@##@##@##############@@@@##       ##@###     @@##@##@@  @##@@##@#      #@@###########",
        ]),
        [
            new Prof( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(20), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(11), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(31), Levels.getCoordinateForRelativeMapPos(8) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(43), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(58), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(74), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(76), Levels.getCoordinateForRelativeMapPos(11) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(7) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(25), Levels.getCoordinateForRelativeMapPos(6) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(66), Levels.getCoordinateForRelativeMapPos(5) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(42), Levels.getCoordinateForRelativeMapPos(8) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(75), Levels.getCoordinateForRelativeMapPos(6) ),
        ]
        ),

        new Level("3: Boss - Transferpaper", "grey", 30, new Map([
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "  .                              ",
            "      .                          ",
            "           .                     ",
            "                                 ",
            "    ####      ####       ####    ",
            "                 .        .      ",
            "   .                             ",
            "                              E  ",
            "##@@##@##@#######################",
        ]),
        [
            new Transferpaper( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(10) ),
        ],
        [

        ]
        ),
        new Level("4", "grey", 35, new Map([
            "                                                                                                        ",
            "    @###                                                                                                ",
            "                                                                           @###                         ",
            "                                  @###                                                                  ",
            "  .       @###                      .                               .                                   ",
            "    .                                 @###@###         .     @###               ###@###                 ",
            "         .            @###              .                     .                                 #@@#@@  ",
            "                                .                        .                                              ",
            "        @@##@##                                         @@##@##@@##@##     .  @@##@##@@##@##            ",
            "                    .         ##@#####@@         .         .                               .            ",
            "   .                                .                 .                                      @###       ",
            "                                                                                                     E  ",
            "##@@##@##@##############@@@@##       ##@######@####@@##@##@@##@##@@##@#      #@@######@###@###@#########",
        ]),
        [
            new Prof( Levels.getCoordinateForRelativeMapPos(10), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(20), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(11), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(31), Levels.getCoordinateForRelativeMapPos(8) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(43), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(58), Levels.getCoordinateForRelativeMapPos(11) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(74), Levels.getCoordinateForRelativeMapPos(7) ),
            new Prof( Levels.getCoordinateForRelativeMapPos(76), Levels.getCoordinateForRelativeMapPos(11) ),
        ],
        [
            new Ects( Levels.getCoordinateForRelativeMapPos(15), Levels.getCoordinateForRelativeMapPos(7) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(25), Levels.getCoordinateForRelativeMapPos(6) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(66), Levels.getCoordinateForRelativeMapPos(5) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(42), Levels.getCoordinateForRelativeMapPos(8) ),
            new Ects( Levels.getCoordinateForRelativeMapPos(75), Levels.getCoordinateForRelativeMapPos(6) ),
        ]
        ),

        new Level("4: Boss - Bachelor Thesis", "grey", 40, new Map([
            "                                           ",
            "                                           ",
            "                                           ",
            "                                           ",
            "              .                            ",
            "    .                                      ",
            "                     .                     ",
            "                                           ",
            "                                           ",
            "                             .      .      ",
            "   .                                       ",
            "                                        E  ",
            "##@@##@##@#################################",
        ]),
        [
            new Bachelorthesis( Levels.getCoordinateForRelativeMapPos(25), Levels.getCoordinateForRelativeMapPos(9) ),
        ],
        [

        ]
        ),

    ];

    public static nextLevelExists(level: Level): boolean {
        let currentLevelIndex = Levels.getLevelIndex(level);
        return(Levels.levels.length > currentLevelIndex + 1);
    }

    public static getNextLevel(level: Level): Level | null{
        if(Levels.nextLevelExists(level)){
            return Levels.levels[Levels.getLevelIndex(level)+1].copyLevel();
        } else{
            return null;
        }
    }

    public static getFirstLevel(): Level{
        return Levels.levels[0].copyLevel();
    }

    private static getLevelIndex(level: Level){
        return(Levels.levels.findIndex(l => l.id === level.id));
    }

    private static getCoordinateForRelativeMapPos(relativeMapPos: number): number{
        return MapTile.targetSize * relativeMapPos;
    }

    

}

export default Levels;