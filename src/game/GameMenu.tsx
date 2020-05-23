import React from 'react';
import './GameUI.css';
import { Modal, Button } from 'react-bootstrap';

interface IGameMenuProps{
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
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Life of PiBS</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Button variant="primary">Start Game</Button>
                </Modal.Body>

            </Modal.Dialog>
        );
    }

}

