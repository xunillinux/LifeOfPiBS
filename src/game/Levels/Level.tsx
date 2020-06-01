import Npc from "../Entities/characters/Npc";
import Item from "../Entities/items/Item";
import Map from "../Map/Map";
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

export default class Level {

    private _id: string;
    private _name: string;
    
    private _backgroundColor: string;
    
    private _map: Map;
     
    private _enemies: Npc[];
    private _items: Item[];

    private _exitIsOpen: boolean;
    

    private _requiredEcts: number;
    
    constructor(name: string, backgroundColor: string, requiredEcts: number, map: Map, enemies: Npc[], ects: Item[]) {

        this._exitIsOpen = false;
        this._name = name;
        this._backgroundColor = backgroundColor;
        this._map = map;
        this._enemies = enemies;
        this._items = ects;
        this._requiredEcts = requiredEcts;
        this._id = uuidv4();

    }

    public copyLevel(): Level{
        let levelCopy: Level = cloneDeep(this as Level);
        return levelCopy;
    };

    public get id(): string {
        return this._id;
    }
    public set id(value: string){
        this.id = value;
    }

    public get name(): string {
        return this._name;
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
    }

    public get map(): Map {
        return this._map;
    }

    public get enemies(): Npc[] {
        return this._enemies;
    }
    public set enemies(value: Npc[]) {
        this._enemies = value;
    }

    public get items(): Item[] {
        return this._items;
    }
    public set items(value:Item[]){
        this._items = value;
    }
    public get requiredEcts(): number {
        return this._requiredEcts;
    }
    public get exitIsOpen(): boolean {
        return this._exitIsOpen;
    }
    public set exitIsOpen(value: boolean) {
        this._exitIsOpen = value;
    }
}