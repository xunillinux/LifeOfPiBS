import React from 'react';
import './GameUI.css';
import { Button } from 'react-bootstrap';
import GameUI from './GameUI';
import KeyBindingMenu from './KeyBindingMenu';

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
                    <div id="gameMenu">
                        <h1>Welcome to Life of PiBS!</h1>
                        <KeyBindingMenu/>
                        <Button variant="primary" onClick={this.props.onGameStartHandler}>
                                Start Game
                            </Button>
                    </div>
                )

            case GameMenuType.PAUSE:
                return(
                    <div id="gameMenu">
                        <GameUI
                            currentEctsScore = {this.props.currentEctsScore}
                            currentLevelName = {this.props.currentLevelName}
                            currentLives = {this.props.currentLives}
                            maxLives = {this.props.maxLives}/>
                        <KeyBindingMenu/>
                        <Button variant="primary" onClick={this.props.onGameResumeHandler}>
                                Resume Game
                            </Button>
                        <Button variant="primary" onClick={this.props.onGameRestartHandler}>
                            Restart Game
                        </Button>
                    </div>
                )
            
            case GameMenuType.NEXTLEVEL:
                return(
                    <div id="gameMenu">
                        <GameUI
                            currentEctsScore = {this.props.currentEctsScore}
                            currentLevelName = {this.props.currentLevelName}
                            currentLives = {this.props.currentLives}
                            maxLives = {this.props.maxLives}/>
                        <Button variant="primary" onClick={this.props.onGameNextLevelHandler}>
                                Continue to next level
                        </Button>
                    </div>
                )

            case GameMenuType.WIN:
                return(
                    <div id="gameMenu">
                        <h1>You won! Here is your certificate:</h1>
                        TODO: img of certificate and text "now go and do yomething useful with your life"
                        <GameUI
                            currentEctsScore = {this.props.currentEctsScore}
                            currentLevelName = {this.props.currentLevelName}
                            currentLives = {this.props.currentLives}
                            maxLives = {this.props.maxLives}/>
                        <Button variant="primary" onClick={this.props.onGameRestartHandler}>
                                Restart PiBS
                        </Button>
                        TODO: onButtonClick: alert "are you really sure, it's 4 years of your life"
                    </div>
                )

                case GameMenuType.LOOSE:
                    return(
                        <div id="gameMenu">
                            <h1>You lost! :(</h1>
                            TODO: img of burned certificate
                            <GameUI
                                currentEctsScore = {this.props.currentEctsScore}
                                currentLevelName = {this.props.currentLevelName}
                                currentLives = {this.props.currentLives}
                                maxLives = {this.props.maxLives}/>
                            <Button variant="primary" onClick={this.props.onGameRestartHandler}>
                                    Restart Game
                            </Button>
                        </div>
                    )

            default:
                break;
        }
    }

    handleModalShown(){
        let body = document.getElementsByTagName("body")[0];
        body.style.padding = "";
        body.classList.remove("modal-open");
    }
}


