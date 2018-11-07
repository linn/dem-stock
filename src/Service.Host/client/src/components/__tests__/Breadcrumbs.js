import React, { Component } from 'react';
import Breadcrumbs from '../Breadcrumbs'
import { BreadcrumbItem } from '../Breadcrumbs'
import { shallow } from 'enzyme'



describe('<Breadcrumbs />',() =>
{

    it('render correct number of breadcrumbs', ()=>
    {
        let wrapper = shallow(<Breadcrumbs location = {{pathname: "/a/test/path"}}/>);

        expect(wrapper.find(BreadcrumbItem).length).toBe(4); // home/a/test/path
    });

    
    it('removes report from path before rendering breadcrumbs', () => 
    {
        let wrapper = shallow(<Breadcrumbs location = {{pathname: "/a/test/path/report"}}/>);
        expect(wrapper.find(BreadcrumbItem).length).toBe(4);
    });


    it('handles clicking on a breadcrumb', () => 
    {
        let mockHistory = {push : jest.fn()};
        const mockedEvent = { target: {}, preventDefault: jest.fn() }
        let wrapper = shallow(<Breadcrumbs location = {{pathname: "/a/test/path"}} history = { mockHistory}/>);
        
        let item = wrapper.find(BreadcrumbItem).at(3).simulate('click', mockedEvent);
        expect(mockHistory.push).toBeCalledWith('/a/test/path');

        // the browser should handle clicks on the first breadcrumb, i.e. the home path
        // i.e. there should not be an extra call to history.push if the 0th node is clicked
        let homeCrumb = wrapper.find(BreadcrumbItem).at(0).simulate('click', mockedEvent);
        expect(mockHistory.push.mock.calls.length).toBe(1);

    });








});