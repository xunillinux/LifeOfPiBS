import React from 'react';
import Game from './Game';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect as chaiexpect } from 'chai';
import { Container } from 'react-bootstrap';
 
Enzyme.configure({ adapter: new Adapter() });


describe('<Game />', () => {
  it("has one Container Component", () =>{
    const tree = shallow(<Game />);
    chaiexpect(tree.find(Container)).to.have.lengthOf(1);
  })
});