import Npc from "./Entities/characters/Npc";
import Item from "./Entities/items/Item";

export default class Level {

    private name: string;
    private backgroundColor: string;
    private _template: string[];
     
    private _enemies: Npc[];
    private _items: Item[];
   

    constructor(name: string, backgroundColor: string, template: string[], enemies: Npc[], ects: Item[]) {

        this.name = name;
        this.backgroundColor = backgroundColor;
        this._template = template;
        this._enemies = enemies;
        this._items = ects;

    }

    public get template(): string[] {
        return this._template;
    }

    public get enemies(): Npc[] {
        return this._enemies;
    }

    public get items(): Item[] {
        return this._items;
    }
}