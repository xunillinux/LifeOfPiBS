import React from 'react';
import GameMenu, { GameMenuType } from './GameMenu';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect as chaiexpect } from 'chai';
 
Enzyme.configure({ adapter: new Adapter() });


describe('<GameMenu />', () => {
  it("has one start game button", () =>{
    const tree = shallow(
      <GameMenu
          show={true}
          gameMenuType={GameMenuType.START}
          currentEctsScore = {42}
          currentLevelName = {"42"}
          currentLives = {1}
          maxLives = {3}
          elapsedTimeS = {42}
          onGameNextLevelHandler = {() => {}}
          onGameRestartHandler = {() => {}}
          onGameResumeHandler = {() => {}}
          onGameStartHandler = {() => {}} />
    );
    chaiexpect(tree.find('#startGameButton')).to.have.lengthOf(1);
  })
});