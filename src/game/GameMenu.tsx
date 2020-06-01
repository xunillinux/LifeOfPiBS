import React from 'react';
import './GameUI.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import GameUI from './GameUI';
import KeyBindingMenu from './KeyBindingMenu';
import Controls from './Controls';

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
                            <Col>
                                <h1 id="welcome_text">Welcome to Life of PiBS!</h1>
                            </Col>
                        </Row>
                        <Row>
                            <KeyBindingMenu/>
                        </Row>
                        <Row>
                            <h4 id="ready_text">Are you ready to start studying?</h4>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Button id="startGameButton" variant="primary" onClick={this.props.onGameStartHandler}> Start Game </Button>
                            </Col>
                            <Col md={6}>
                                or press space to start...
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
                                <Button id="resumeGameButton" variant="primary" onClick={this.props.onGameResumeHandler}> Resume Game </Button>
                            </Col>
                        </Row>
                        <Row>
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
                                <Button id="continueToLevelButton"variant="primary" onClick={this.props.onGameNextLevelHandler}> Continue to next level </Button>
                            </Col>
                        </Row>
                    </Container>
                )

            case GameMenuType.WIN:
                return(
                    <Container id="gameMenu" fluid>
                        <Row>
                            <Col>
                                <h1>You won! Here is your certificate:</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                TODO: img of certificate and text "now go and do something useful with your life"
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4 id="useful_text">Now go and do something useful with your life</h4>
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
                                <Button id="restartPiBSButton" variant="primary" onClick={this.props.onGameRestartHandler}> Restart PiBS </Button>
                                TODO: onButtonClick: alert "are you really sure, it's 4 years of your life"
                            </Col>
                        </Row>
                    </Container>
                )

                case GameMenuType.LOOSE:
                    return(
                        <Container id="gameMenu" fluid>
                            <Row>
                                <Col>
                                    <h1>You lost! :(</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    TODO: img of burned certificate
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


