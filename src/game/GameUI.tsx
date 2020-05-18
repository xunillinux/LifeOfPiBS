import React from 'react';
import './GameUI.css';
import ectsCoin from '../game/images/ects_UI.jpg';
import fullHeart from '../game/images/full_heart.jpg';
import emptyHeart from '../game/images/empty_heart.jpg';

interface IGameUIProps{
    currentLevelName: string;
    currentEctsScore: number;
    currentLives: number;
    maxLives: number;
}

interface IGameUIState{
}

export default class GameUI extends React.Component<IGameUIProps, IGameUIState> {

    // eslint-disable-next-line
    constructor(props:IGameUIProps){
        super(props);
    }

    render(){

      const lifeImages = [];
      
      for(let i=0; i < this.props.maxLives; i++){
        lifeImages.push(
          <img
            key={"lifeImg"+ i}
            alt="logo"
            src={ (i < this.props.currentLives) ? fullHeart : emptyHeart}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        );
      }

        return (
            <div className="GameUI row">
                <div className="col-lg-6">
                  <strong>Level:</strong> {this.props.currentLevelName}
                </div>
                <div className="col-lg-3">
                  <img
                      alt="logo"
                      src={ectsCoin}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    /> : {this.props.currentEctsScore}
                </div>
                <div className="col-lg-3">
                  {lifeImages}
                </div>
            </div>
          );
    }

}

