class Config {

    private tileSizeSource: any;
    private tileSizeTarget: any;

    private gravity: number;
    private fps: number;
    
    constructor() {

        this.tileSizeSource = {w:16, h:16};
        this.tileSizeTarget = {w:32, h:32};
        
        this.gravity = 2;
        this.fps = 30;

    }


}

export default Config;