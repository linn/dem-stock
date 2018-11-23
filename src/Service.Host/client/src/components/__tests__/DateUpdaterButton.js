import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import DateUpdaterButton from '../DateUpdaterButton'
import { shallow } from 'enzyme'

describe('<DateUpdaterButton />', () => {
    let props;
    let mountedDateUpdaterButton;

    const dateUpdaterButton = () => {
        if (!mountedDateUpdaterButton) {
            mountedDateUpdaterButton = shallow(
                <DateUpdaterButton {...props} />
            );
        }
        return mountedDateUpdaterButton;
    }

    beforeEach(() => {
        props = {};
        mountedDateUpdaterButton = undefined;
    });
    
    it('handles click', () =>
    {
        let wrapper = shallow(<DateUpdaterButton />);
        expect(dateUpdaterButton().state().isOpen).toBe(false);
        dateUpdaterButton().find(Button).simulate('click');
        expect(dateUpdaterButton().state().isOpen).toBe(true);
    });
});