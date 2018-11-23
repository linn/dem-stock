import React from 'react';
import { shallow, } from 'enzyme';
import Activities from '../Activities';
import { ListGroup, Button, Alert } from 'react-bootstrap';

describe('<Activites />', () => {
    const testActivities = ['a', 'test'];
    let props;
    let mountedActivities;

    const activities = () => {
        if (!mountedActivities) {
            mountedActivities = shallow(
                <Activities {...props} />
            );
        }
        return mountedActivities;
    }

    beforeEach(() => {
        props = {
            activities: [],
            updating: false
        };
        mountedActivities = undefined;
    });

    describe('When no Activities', () => {

        it('Renders Correctly', () => {
            expect(activities().find(Alert).length).toBe(1);
        });
    });

    describe('When activities', () => {

        beforeEach(() => {
            props.activities = testActivities;
        });

        it('Shows button to view activities', () => {
            expect(activities().find(Button).length).toBe(1);
        });

        it('Shows activities when button clicked', () => {
            activities().find(Button).dive().simulate('click');
            expect(activities().state().viewActivities).toBe(true);
            expect(activities().find(ListGroup).length).toBe(1);
            expect(activities().find(ListGroup).children().length).toBe(testActivities.length);
        });
    });
});