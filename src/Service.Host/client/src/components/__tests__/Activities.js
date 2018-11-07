import React from 'react';
import { shallow,} from 'enzyme';
import Activities from '../Activities';
import { ListGroup, Button, Alert } from 'react-bootstrap';



describe('<Activites />', () => 
{
    let testActivities = ['a', 'test'];

    describe('Renders Correctly When no Activities', () =>
    {
        let wrapper = shallow(<Activities activities = {[]} updating={false}  />);
        
        it('Shows alert if no activities', () =>
        {
            expect(wrapper.find(Alert).length).toBe(1);
        });

    });

    describe('Renders Correctly when activies', () => 
    {
        let wrapper = shallow(<Activities activities = {testActivities} updating={false}  />);
        it('Shows button to view activities', () =>
        {
            expect(wrapper.find(Button).length).toBe(1);
        });

        

    });

    describe('Handles Interactions', () =>
    {
        let wrapper = shallow(<Activities activities = {testActivities} updating={false}  />);
        it('Shows activities when button clicked', () =>
        {
            wrapper.find(Button).dive().simulate('click');
            expect(wrapper.state().viewActivities).toBe(true);
            expect(wrapper.find(ListGroup).length).toBe(1);
            expect(wrapper.find(ListGroup).children().length).toBe(testActivities.length);
        });
    });




});