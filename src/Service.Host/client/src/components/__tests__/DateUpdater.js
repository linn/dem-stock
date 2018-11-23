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
    let props;
    let mountedDateUpdater;

    const dateUpdater = () => {
        if (!mountedDateUpdater) {
            mountedDateUpdater = shallow(
                <DateUpdater {...props} />
            );
        }
        return mountedDateUpdater;
    }

    beforeEach(() => {
        props = {
            displayOnly: false,
            value: before,
            onChange: onChange
        };
        mountedDateUpdater = undefined;
    });

    describe('If state is not displayOnly', () => {

        it('renders an update Button and Picker', () => {
            expect(dateUpdater().find(Button).length).toBe(1);
            expect(dateUpdater().find(InlineDatePicker).length).toBe(1);
        });
    });

    describe('If state is displayOnly', () => {
        
        beforeEach(() => {
            props.displayOnly = true;
        });

        it('does not render update button if displayOnly', () =>{
            expect(dateUpdater().find(Button).length).toBe(0);    
        });
    });

    it('handles click', () => {
        dateUpdater().find(Button).simulate('click');
        expect(dateUpdater().state().isOpen).toBe(true);
    });

    it('handles date change', () => {
        dateUpdater().find(InlineDatePicker).simulate('change', after);
        expect(dateUpdater().state().isOpen).toBe(false);
        expect(onChange).toBeCalledWith(after);
    });
});