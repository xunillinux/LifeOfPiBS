import TilePosition from "./SpritePosition";
import Npc from "./Entities/characters/Npc";
import Ects from "./Entities/items/Ects";

export default class Level {

    private name: string;
    private backgroundColor: string;
    private _template: string[];
     
    private _enemies: Npc[];
    private _ects: Ects[];
   

    constructor(name: string, backgroundColor: string, template: string[], enemies: Npc[], ects: Ects[]) {

        this.name = name;
        this.backgroundColor = backgroundColor;
        this._template = template;
        this._enemies = enemies;
        this._ects = ects;

    }

    public get template(): string[] {
        return this._template;
    }

    public get enemies(): Npc[] {
        return this._enemies;
    }

    public get ects(): Ects[] {
        return this._ects;
    }
}