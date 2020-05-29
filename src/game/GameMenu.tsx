import React from 'react';
import './GameUI.css';
import { Modal, Button } from 'react-bootstrap';
import Level from './Levels/Level';

interface IGameMenuProps{
    show: boolean;
    gameMenuType: GameMenuType;
    currentLevel: Level;
    onModalCloseHandler: () => void;
}

interface IGameMenuState{
}

export default class GameMenu extends React.Component<IGameMenuProps, IGameMenuState> {

    private modalRef: React.RefObject<Modal>;

    // eslint-disable-next-line
    constructor(props:IGameMenuProps){
        super(props);

        this.modalRef = React.createRef();


    }

    render(){

        return (
            <Modal ref={this.modalRef} show={this.props.show} onShow={this.handleModalShown}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Welcome to Life of PiBS!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onModalCloseHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleModalShown(){
        let body = document.getElementsByTagName("body")[0];
        body.style.padding = "";
        body.classList.remove("modal-open");
    }

}

export enum GameMenuType{
    START,
    PAUSE,
    NEXTLEVEL,
    WIN,
    LOOSE
}
