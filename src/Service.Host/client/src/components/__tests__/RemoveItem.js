import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import { OkModal } from '../common/OkModal';
import { shallow } from 'enzyme'
import RemoveItem from '../RemoveItem'

describe('<RemoveItem />', () => {
    let props;
    let mountedRemoveItem;
    let onConfirm = jest.fn();

    const removeItem = () => {
        if (!mountedRemoveItem) {
            mountedRemoveItem = shallow(
                <RemoveItem {...props} />
            );
        }
        return mountedRemoveItem;
    }

    beforeEach(() => {
        props = {onConfirm: onConfirm};
        mountedRemoveItem = undefined;
    });

    it('handles button click', () => {
        removeItem().find(Button).simulate('click');
        expect(removeItem().state().isOpen).toBe(true);
    });

    it('renders modal', () => {
        expect(removeItem().find(OkModal).length).toBe(1);
    });

    it('handles cancel modal click', () => {
        let instance = removeItem().instance();
        instance.handleCancel();

        expect(removeItem().state().isOpen).toBe(false);
    });

    it('handles ok modal click', () => {
        removeItem().setState({ isOpen: true });
        let instance = removeItem().instance();
        instance.handleOk();
        expect(removeItem().state().isOpen).toBe(false);
        expect(onConfirm.mock.calls.length).toBe(1);
    });
});