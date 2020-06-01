import React from 'react';
import './GameUI.css';
import ectsCoin from '../game/images/ects_UI.jpg';
import fullHeart from '../game/images/full_heart.jpg';
import emptyHeart from '../game/images/empty_heart.jpg';
import { Row, Col, Container } from 'react-bootstrap';

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
            className="d-inline-block align-top" />
        );
      }

        return (
          <Container id="gameUIContainer" fluid>
            <Row>
              <Col>
                <strong>Lvl {this.props.currentLevelName} </strong>
              </Col>
              <Col className="text-right">
                <img alt="logo" src={ectsCoin} width="30" height="30" className="d-inline-block align-top" />
                <strong> {this.props.currentEctsScore} </strong>
                {lifeImages}
              </Col>
            </Row>
          </Container>
        );
    }

}

