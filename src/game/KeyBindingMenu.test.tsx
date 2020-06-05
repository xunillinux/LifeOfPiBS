import React from 'react';
import KeyBindingMenu from './KeyBindingMenu';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect as chaiexpect } from 'chai';
import { Container } from 'react-bootstrap';
 
Enzyme.configure({ adapter: new Adapter() });


describe('<KeyBindingMenu />', () => {
  it("has one Container Component", () =>{
    const tree = shallow(<KeyBindingMenu />);
    chaiexpect(tree.find(Container)).to.have.lengthOf(1);
  })
});
