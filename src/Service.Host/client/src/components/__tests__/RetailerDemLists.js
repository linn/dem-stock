import React, { Component } from 'react';
import { Loading } from '../common';
import RetailerDemListLastReviewedLine from '../RetailerDemListLastReviewedLine';

// mock the config dependency
jest.mock('../../config', () => ({
    appRoot: 'root'
  }))

import RetailerDemLists from '../RetailerDemLists';
import { shallow } from 'enzyme';

describe('<RetailerDemList />', () => 
{
    
    it('renders correct number of lines', () =>
    {
        

        let retailerDemLists = {items: ['a', 'list', 'of', 'four']};
        let wrapper = shallow(<RetailerDemLists retailerDemLists = {retailerDemLists} />);
        expect(wrapper.find(Loading).length).toBe(0);
        expect(wrapper.find(RetailerDemListLastReviewedLine).length).toBe(4);
    });   

    
    it('renders loading if no list', () =>
    {
        let wrapper = shallow(<RetailerDemLists retailerDemLists={[]} />);
        expect(wrapper.find(Loading).length).toBe(1);
    });   

});