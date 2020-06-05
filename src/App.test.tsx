import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './game/Game';
import { expect as chaiexpect } from 'chai';
import { Navbar } from 'react-bootstrap';
 
Enzyme.configure({ adapter: new Adapter() });


describe('<App />', () => {
  it("has one Game Component", () =>{
    const tree = shallow(<App />);
    chaiexpect(tree.find(Game)).to.have.lengthOf(1);
  })
  it("has one Navbar Component", () =>{
    const tree = shallow(<App />);
    chaiexpect(tree.find(Navbar)).to.have.lengthOf(1);
  })
  
});
