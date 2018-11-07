import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import DateUpdaterButton from '../DateUpdaterButton'
import { shallow } from 'enzyme'


describe('<DateUpdaterButton />', () => 
{
    it('handles click', () =>
    {
        let wrapper = shallow(<DateUpdaterButton />);
        
        expect(wrapper.state().isOpen).toBe(false);
        wrapper.find(Button).simulate('click');
        expect(wrapper.state().isOpen).toBe(true);
    });

});