import React from 'react';
import './GameUI.css';

interface IGameUIProps{
    currentLevelName: string;
    currentEctsScore: number;
    currentLives: number;
}

interface IGameUIState{
}

export default class GameUI extends React.Component<IGameUIProps, IGameUIState> {

    // eslint-disable-next-line
    constructor(props:IGameUIProps){
        super(props);
    }

    render(){
        return (
            <div className="GameUI">
              <header className="GameUI-header">
                <div className="col-md-2">col-md-2</div>
              </header>
            </div>
          );
    }

    drawUI(){
        //TODO implement
    }
  
}

