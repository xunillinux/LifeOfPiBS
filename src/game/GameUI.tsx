import React from 'react';
import './GameUI.css';
import {Table} from 'react-bootstrap';
import ectsCoin from '../game/images/ects_UI.jpg';
import lives from '../game/images/lives_UI.jpg';

interface IGameUIProps{
    currentLevelName: string;
    currentEctsScore: number;
    currentLives: number;
}

interface IGameUIState{
}

export default class GameUI extends React.Component<IGameUIProps, IGameUIState> {

    // eslint-disable-next-line
    constructor(props:IGameUIProps){
        super(props);
    }

    render(){
        return (
            <div className="GameUI">
              <header className="GameUI-header">
                <Table className="uiTable"size="sm" borderless>
                  <tbody>
                    <tr>
                      <td></td>
                      <td><img
                        alt="logo"
                        src={ectsCoin}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                      /> Score: {this.props.currentEctsScore}</td>
                    </tr>
                    <tr>
                      <td>Level: {this.props.currentLevelName}</td>
                      <td><img
                        alt="logo"
                        src={lives}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                      /> Lives: {this.props.currentLives}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </header>
            </div>
          );
    }

    drawUI(){
        //TODO implement
    }
  
}

