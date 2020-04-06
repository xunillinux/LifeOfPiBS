import React from 'react';
import { render } from '@testing-library/react';
import Gamecanvas from './Gamecanvas';
<<<<<<< HEAD
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

test('canvas render', () => {
    
    const wrapper = shallow(
        <Gamecanvas/>
    );

    expect(wrapper).toMatchSnapshot();
=======

test('some test', () => {
  //TODO
  expect(true);
>>>>>>> 17950a2b592c8cc217d540efc728e370eea1f77f
});
