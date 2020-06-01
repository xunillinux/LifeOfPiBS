import React from 'react';
import './GameMenu.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import GameUI from './GameUI';
import KeyBindingMenu from './KeyBindingMenu';
import Controls from './Controls';
import certImg from './images/bachelorcert.jpg'
import burnedCertImg from './images/bachelorcert_burned.jpg'

interface IGameMenuProps{
    show: boolean;
    gameMenuType: GameMenuType;
    onGameStartHandler: () => void;
    onGameResumeHandler: () => void;
    onGameNextLevelHandler: () => void;
    onGameRestartHandler: () => void;
    currentLevelName: string;
    currentEctsScore: number;
    currentLives: number;
    maxLives: number;
}

interface IGameMenuState{
}

export enum GameMenuType{
    START,
    PAUSE,
    NEXTLEVEL,
    WIN,
    LOOSE
}
export default class GameMenu extends React.Component<IGameMenuProps, IGameMenuState> {

    // eslint-disable-next-line
    constructor(props:IGameMenuProps){
        super(props);
    }

    render(){

        switch (this.props.gameMenuType) {
            case GameMenuType.START:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col> <h1>Welcome to Life of PiBS!</h1> </Col>
                        </Row>
                        <Row>
                            <Col>
                                <KeyBindingMenu/>
                            </Col>
                        </Row>
                        <Row>
                            <Col> <h4>Are you ready to start studying?</h4> </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="startGameButton" variant="primary" onClick={this.props.onGameStartHandler}> Press <kbd>SPACE</kbd> to start </Button>
                            </Col>
                        </Row>
                    </Container>
                )

            case GameMenuType.PAUSE:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col>
                                <GameUI
                                    currentEctsScore = {this.props.currentEctsScore}
                                    currentLevelName = {this.props.currentLevelName}
                                    currentLives = {this.props.currentLives}
                                    maxLives = {this.props.maxLives}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <KeyBindingMenu/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="resumeGameButton" variant="primary" onClick={this.props.onGameResumeHandler}> <kbd>SPACE</kbd> to Resume </Button>
                            </Col>
                            <Col>
                                <Button id="restartGameButton" variant="primary" onClick={this.props.onGameRestartHandler}> Restart Game </Button>
                            </Col>
                        </Row>
                    </Container>
                )
            
            case GameMenuType.NEXTLEVEL:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col>
                                <GameUI
                                    currentEctsScore = {this.props.currentEctsScore}
                                    currentLevelName = {this.props.currentLevelName}
                                    currentLives = {this.props.currentLives}
                                    maxLives = {this.props.maxLives}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="continueToLevelButton"variant="primary" onClick={this.props.onGameNextLevelHandler}> <kbd>SPACE</kbd> to Continue </Button>
                            </Col>
                        </Row>
                    </Container>
                )

            case GameMenuType.WIN:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col> <h1>You did it! :) </h1> </Col>
                        </Row>
                        <Row>
                            <Col>
                                Here is your certificate:
                                <img alt="certificate" src={certImg} width="100%" height="auto" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <GameUI
                                    currentEctsScore = {this.props.currentEctsScore}
                                    currentLevelName = {this.props.currentLevelName}
                                    currentLives = {this.props.currentLives}
                                    maxLives = {this.props.maxLives}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col> Now go and do something useful with your life! </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="restartPiBSButton" variant="primary" onClick={this.props.onGameRestartHandler}> Restart PiBS </Button>
                            </Col>
                        </Row>
                    </Container>
                )

            case GameMenuType.LOOSE:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col> <h1>You lost! :(</h1> </Col>
                        </Row>
                        <Row>
                            <Col>
                                Your certificate was burned...
                                <img alt="certificate" src={burnedCertImg} width="100%" height="auto" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <GameUI
                                    currentEctsScore = {this.props.currentEctsScore}
                                    currentLevelName = {this.props.currentLevelName}
                                    currentLives = {this.props.currentLives}
                                    maxLives = {this.props.maxLives}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="restartButton" variant="primary" onClick={this.props.onGameRestartHandler}> Restart Game </Button>
                            </Col>
                        </Row>
                    </Container>
                )
        }
    }

    componentDidMount(){
        let props = this.props;
        window.onkeydown = function (e: any) {
            switch (e.keyCode) {
                case 32: // space
                    e.preventDefault();
                    
                    switch (props.gameMenuType) {
                        case GameMenuType.START:
                            props.onGameStartHandler();
                            break;
                        case GameMenuType.PAUSE:
                            props.onGameResumeHandler();
                            break;
                        case GameMenuType.NEXTLEVEL:
                            props.onGameNextLevelHandler();
                            break;
                    }
                    break;
            }
        }
    }

    componentWillUnmount(){
        Controls.registerKeyEvents();
    }

}


