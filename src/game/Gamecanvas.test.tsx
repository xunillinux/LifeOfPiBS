import React from 'react';
import { render } from '@testing-library/react';
import Gamecanvas from './Gamecanvas';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

test('canvas render', () => {
    
    const wrapper = shallow(
        <Gamecanvas/>
    );

    expect(wrapper).toMatchSnapshot();
});
