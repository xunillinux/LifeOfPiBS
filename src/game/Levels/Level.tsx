import Npc from "../Entities/characters/Npc";
import Item from "../Entities/items/Item";
import Map from "../Map/Map";

export default class Level {

    private name: string;
    private backgroundColor: string;
    private _map: Map;
     
    private _enemies: Npc[];
    private _items: Item[];
   

    constructor(name: string, backgroundColor: string, map: Map, enemies: Npc[], ects: Item[]) {

        this.name = name;
        this.backgroundColor = backgroundColor;
        this._map = map;
        this._enemies = enemies;
        this._items = ects;

    }

    public get map(): Map {
        return this._map;
    }

    public get enemies(): Npc[] {
        return this._enemies;
    }

    public get items(): Item[] {
        return this._items;
    }
}