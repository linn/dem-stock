import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import { OkModal } from '../common/OkModal';
import { shallow } from 'enzyme'
import RemoveItem from '../RemoveItem'


describe('<RemoveItem />', () => {

    let onConfirm = jest.fn();
    let wrapper = shallow(<RemoveItem title = {'title'} onConfirm = {onConfirm}/>);
    
    it('handles button click', ()=>
    {
        wrapper.find(Button).simulate('click');
        expect(wrapper.state().isOpen).toBe(true);
    });

    it('renders modal', () =>
    {
        expect(wrapper.find(OkModal).length).toBe(1);
    });

    it('handles cancel modal click', () =>
    {
        let instance = wrapper.instance();
        instance.handleCancel();

        expect(wrapper.state().isOpen).toBe(false);
    });


    it('handles ok modal click', () =>
    {
        wrapper.setState({isOpen:true});
        let instance = wrapper.instance();
        instance.handleOk();
        expect(wrapper.state().isOpen).toBe(false);
        expect(onConfirm.mock.calls.length).toBe(1);
    });


})