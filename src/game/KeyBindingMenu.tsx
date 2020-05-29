import React from 'react';
import './GameUI.css';


export default class KeyBindingMenu extends React.Component{

    // eslint-disable-next-line
    constructor(props: any){
        super(props)
    }

    render(){
        return (
            <div id="keyBinding">
                <h2>Key Binding</h2>
                <table>
                    <tr>
                        <td><kbd>RIGHT</kbd></td>
                        <td>Move right</td>
                    </tr>
                    <tr>
                        <td><kbd>LEFT</kbd></td>
                        <td>Move left</td>
                    </tr>
                    <tr>
                        <td><kbd>SPACE</kbd></td>
                        <td>Jump</td>
                    </tr>
                    <tr>
                        <td><kbd>UP</kbd></td>
                        <td>Jump</td>
                    </tr>
                    <tr>
                        <td><kbd>E</kbd></td>
                        <td>Shoot</td>
                    </tr>
                    <tr>
                        <td><kbd>ESC</kbd></td>
                        <td>Pause</td>
                    </tr>
                </table>
            </div>
          );
    }

}

