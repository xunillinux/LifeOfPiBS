import React from 'react';
import './GameUI.css';

interface IGameUIProps{

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
        
              </header>
            </div>
          );
    }

    drawUI(){
        //TODO implement
    }
  
}

