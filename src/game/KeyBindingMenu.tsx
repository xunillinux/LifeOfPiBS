import React from 'react';
import './KeyBindingMenu.css';
import { Row, Col, Container } from 'react-bootstrap';


export default class KeyBindingMenu extends React.Component{

    // eslint-disable-next-line
    constructor(props: any){
        super(props)
    }

    render(){
        return (
            <Container id="keyBinding" className="info-box" fluid>
                <Row>
                    <Col>
                        <h2>Key Binding</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <kbd>RIGHT</kbd>
                    </Col>
                    <Col className="text-left">
                        Move right
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                    <kbd>LEFT</kbd>
                    </Col>
                    <Col className="text-left">
                        Move left
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <kbd>SPACE</kbd>,
                        <kbd>UP</kbd>
                    </Col>
                    <Col className="text-left">
                        Jump
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <kbd>E</kbd>
                    </Col>
                    <Col className="text-left">
                        Shoot
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <kbd>ESC</kbd>
                    </Col>
                    <Col className="text-left">
                        Pause
                    </Col>
                </Row>
            </Container>
          );
    }

}

