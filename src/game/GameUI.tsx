import React from 'react';
import './GameUI.css';
import ectsCoin from '../game/images/ects_UI.jpg';
import fullHeart from '../game/images/full_heart.jpg';
import emptyHeart from '../game/images/empty_heart.jpg';
import { Row, Col, Container } from 'react-bootstrap';
import { ReactComponent as VolumeUp } from '../game/images/volume-up.svg';
import { ReactComponent as VolumeMute } from '../game/images/volume-mute.svg';
import Config from './Config';
import Sound, { Sounds } from './soundfx/Sound';

interface IGameUIProps{
    currentLevelName: string;
    currentEctsScore: number;
    currentLives: number;
    maxLives: number;
}

interface IGameUIState{
  soundsEnabled: boolean;
}

export default class GameUI extends React.Component<IGameUIProps, IGameUIState> {

    // eslint-disable-next-line
    constructor(props:IGameUIProps){
        super(props);
        this.state = {
          soundsEnabled: Config.soundsEnabled
      };

      this.toggleSound = this.toggleSound.bind(this);
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
            className="d-inline-block align-top lifeImg" />
        );
      }

      let volumeImg;

      if(this.state.soundsEnabled){
        volumeImg = <VolumeUp width="30px" height="30px" className="volumeSvg" onClick={this.toggleSound}/>;
      } else{
        volumeImg = <VolumeMute width="30px" height="30px" className="volumeSvg" onClick={this.toggleSound}/>;
      }

        return (
          <Container id="gameUIContainer" fluid>
            <Row>
              <Col>
                <strong>Lvl {this.props.currentLevelName} </strong>
              </Col>
              <Col className="text-right unselectable">
                {volumeImg}
                <img alt="logo" src={ectsCoin} width="30" height="30" className="d-inline-block align-top" />
                <strong> {this.props.currentEctsScore} </strong>
                {lifeImages}
              </Col>
            </Row>
          </Container>
        );
    }

    private toggleSound(){
      Sound.toggleSound();
      this.setState({soundsEnabled: Config.soundsEnabled});
    }

}

