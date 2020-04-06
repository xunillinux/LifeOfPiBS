export default class Level {

    private name: string;
    private backgroundColor: string;
    private template: string[]; 

    constructor(name: string, backgroundColor: string, template: string[]) {

        this.name = name;
        this.backgroundColor = backgroundColor;
        this.template = template;

    }

    getTemplate(): string[]{
        return this.template;
    }

}