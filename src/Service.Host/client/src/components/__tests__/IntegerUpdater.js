import React from 'react';
import { shallow} from 'enzyme';
import IntegerUpdater from '../IntegerUpdater';
import { IntegerInput } from '../common/IntegerInput';
import {Button} from 'react-bootstrap';


describe('<IntegerUpdater />', () => 
{

    const defaultProps = {
        value:1,
        displayOnly:false,
        updating:false
    }


    describe('Renders Correctly', () => 
    {
        it('should display button if not display only', () =>
        {
            let wrapper = shallow(<IntegerUpdater {...defaultProps} />);
            expect(wrapper.find(Button).length).toBe(1);
        });

        it('should display value if displayOnly', () =>
        {
            let wrapper = shallow(<IntegerUpdater {...defaultProps} displayOnly = {true}/>);
            expect(wrapper.find(Button).length).toBe(0);
            expect(wrapper.text()).toBe('1');
        });
    });



    describe('Handles Click', () => 
    {
        let wrapper = shallow(<IntegerUpdater {...defaultProps}/>);
        wrapper.find(Button).simulate('click');

        it('should open input when clicked', () => 
        {
            expect(wrapper.state().isOpen).toBe(true);
            expect(wrapper.find(IntegerInput).length).toBe(1);
        });
    });
});