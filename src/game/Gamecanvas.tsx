import React from 'react';
import './Gamecanvas.css';
import gamesketchimg from './images/gamesketchimg.jpg';
import Controls from './Controls';

class Canvas extends React.Component {

    private gameCanvasRef: any;
    private gameSketchImgRef: any;

    constructor(props: any) {
        super(props);
        this.gameCanvasRef = React.createRef();
        this.gameSketchImgRef = React.createRef();
        Controls.registerKeyEvents();
        
    }

    componentDidMount() {
        const canvas = this.gameCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = this.gameSketchImgRef.current;

        if(ctx != null && img != null && img.currentSrc != null){
            img.onload = () => {
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            }
        }
        
    }

    render() {

        return (
            <div>
                <canvas ref={this.gameCanvasRef} width={755} height={425} />
                <img ref={this.gameSketchImgRef} src={gamesketchimg} className="hidden" />
            </div>
        )
    }
}

export default Canvas