import React from 'react';
import './GameUI.css';
import { Modal, Button } from 'react-bootstrap';
import Level from './Levels/Level';

interface IGameMenuProps{
    show: boolean;
    gameMenuType: GameMenuType;
    currentLevel: Level;
}

interface IGameMenuState{
}

export default class GameMenu extends React.Component<IGameMenuProps, IGameMenuState> {

    // eslint-disable-next-line
    constructor(props:IGameMenuProps){
        super(props);
    }

    render(){

        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Welcome to Life of PiBS!
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }

}

export enum GameMenuType{
    START,
    PAUSE,
    NEXTLEVEL,
    WIN,
    LOOSE
}
