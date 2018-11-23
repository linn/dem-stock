import React from 'react';
import { shallow } from 'enzyme';
import IntegerUpdater from '../IntegerUpdater';
import { IntegerInput } from '../common/IntegerInput';
import { Button } from 'react-bootstrap';

describe('<IntegerUpdater />', () => {
    let props;
    let mountedIntegerUpdater;

    const integerUpdater = () => {
        if (!mountedIntegerUpdater) {
            mountedIntegerUpdater = shallow(
                <IntegerUpdater {...props} />
            );
        }
        return mountedIntegerUpdater;
    }

    beforeEach(() => {
        props = {
            value: 1,
            updating: false,
            displayOnly: false
        };
        mountedIntegerUpdater = undefined;
    });

    describe('if not displayOnly', () => {

        beforeEach(() => {
            props.displayOnly = false;
        });

        it('should display button if not display only', () => {
            expect(integerUpdater().find(Button).length).toBe(1);
        });

        it('should open input when clicked', () => {
            integerUpdater().find(Button).simulate('click');
            expect(integerUpdater().state().isOpen).toBe(true);
            expect(integerUpdater().find(IntegerInput).length).toBe(1);
        });
    });

    describe('if displayOnly', () => {

        beforeEach(() => {
            props.displayOnly = true;
        });

        it('should display value if displayOnly', () => {
            expect(integerUpdater().find(Button).length).toBe(0);
            expect(integerUpdater().text()).toBe('1');
        });
    });
});