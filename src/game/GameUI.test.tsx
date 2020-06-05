import React from 'react';
import GameUI from './GameUI';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect as chaiexpect } from 'chai';
import { Container } from 'react-bootstrap';
 
Enzyme.configure({ adapter: new Adapter() });


describe('<GameUI />', () => {
  it("has amount of life images equal to maxLives param", () =>{
    let maxLives = 3;

    const tree = shallow(
      <GameUI
        currentEctsScore = {42}
        currentLevelName = {"42"}
        currentLives = {3}
        maxLives = {maxLives}/>
    );
    chaiexpect(tree.find(".lifeImg")).to.have.lengthOf(maxLives);
  })
});
