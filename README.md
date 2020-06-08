# Life of PiBS

## What is Life of PiBS

Life of PiBS is a simple jump and run browser game that let's you experience the great journey of a PiBS student.
The game can be played here: [Life of PiBS](https://xunillinux.github.io/LifeOfPiBS/)

### Game Description

Life of PiBS is a jump and run game, where the pc (player character) can walk to the left and right, jump onto platforms and shoot projectiles to the left and right. The levels are predesigned and contain monsters that walk around. Once a monster gets within a certain range of the pc it will walk towards him. If the pc touches one of the monsters he will loose a life. Once the pc has no lifes left the game is over.

The goal of the pc in each level is to collect ECTS points by finding them in the map and touching them. Once the pc collected enough ECTS points he can continue to the boss fight of that level. In the boss fights the pc has to shoot the boss a few times without getting touched by it. Once a boss is defeated the pc will be transfered to a new level.

The first few levels will each have a "semester paper" as boss that gets more and more complete whenever it is hit by a projectile.
The final boss will be the "bachelor thesis".

### Functional Requirements
1) The user can start a new game by clicking on the button "Start Game".
2) The user can move the player forward by pressing the -> or the "D" key.
3) The user can move the player backward by pressing the <- or the "A" key.
4) The user can move the player upward (jump) by pressing the "up" or the "W" key.
5) The user can make the player shoot by pressing the "space" key.
6) The user can pause the game by pressing the "Esc" key.
7) The count of lives is displayed in the top right corner.
8) The count of ECTS is displayed in the top right corner.
9) The current level is displayed in the top left corner.
10) The exit of the level is blocked until all ECTS of the level have been gathered or the "boss" of the level has been defeated (life = 0).
11) The count of lives decreases by one if the player touches an enemy or falls out of the frame.
12) The count of ECTS increases by one if the player touches an ECTS-instance.


### Non Functional Requirements
Environment: The game can be played in the browser "Chrome".
Time: A new game has loaded within 5 seconds.
