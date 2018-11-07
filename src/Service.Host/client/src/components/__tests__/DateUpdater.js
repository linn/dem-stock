import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import InlineDatePicker from '../common/InlineDatePicker';
import { shallow } from 'enzyme'
import { DateUpdater } from '../DateUpdater';
import moment from 'moment';



describe('<DateUpdater />', () => 
{
    const before = moment("1995-03-28");
    const after = moment("2018-03-28");

    let onChange = jest.fn();

    const defaultProps = {
        displayOnly: false,
        value: before,
        onChange: onChange
    }


    
    
    it('renders an update Button and Picker if not displayOnly', () =>
    {
        let wrapper = shallow(<DateUpdater {...defaultProps} />);
        expect(wrapper.find(Button).length).toBe(1);
        expect(wrapper.find(InlineDatePicker).length).toBe(1);
    });

    
    it('does not render update button if displayOnly', () =>
    {
        let wrapper = shallow(<DateUpdater {...defaultProps} displayOnly={true}  />);
        expect(wrapper.find(Button).length).toBe(0);
        
    });



    it('handles click', () => 
    {
        let wrapper = shallow(<DateUpdater  {...defaultProps} />);
        wrapper.find(Button).simulate('click');
        expect(wrapper.state().isOpen).toBe(true);
    });

    
    it('handles date change', () => 
    {   
        
        let wrapper = shallow(<DateUpdater  {...defaultProps} />);
        wrapper.find(InlineDatePicker).simulate('change', after  );
        expect(wrapper.state().isOpen).toBe(false);
        expect(onChange).toBeCalledWith(after);
    });
});