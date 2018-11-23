import React, { Component } from 'react';
import { Loading } from '../common';
import RetailerDemListLastReviewedLine from '../RetailerDemListLastReviewedLine';

// mock the config dependency
jest.mock('../../config', () => ({
    appRoot: 'root'
  }))

import RetailerDemLists from '../RetailerDemLists';
import { shallow } from 'enzyme';

describe('<RetailerDemLists />', () => {
    let props;
    let mountedRetailerDemLists;

    const retailerDemLists = () => {
        if (!mountedRetailerDemLists) {
            mountedRetailerDemLists = shallow(
                <RetailerDemLists {...props} />
            );
        }
        return mountedRetailerDemLists;
    };

    beforeEach(() => {
        props = {};
        mountedRetailerDemLists = undefined;
    });

    describe('When dem lists', () => {
        
        beforeEach(() => {
            props.retailerDemLists = {items: ['a', 'list', 'of', 'four']};
        });   
    
        it('renders correct number of lines', () => {
            expect(retailerDemLists().find(Loading).length).toBe(0);
            expect(retailerDemLists().find(RetailerDemListLastReviewedLine).length).toBe(4);
        });   
    });

    describe('When no dem lists', () => {
        
        beforeEach(() => {
            props.retailerDemLists = [];
        });

        it('renders loading spinner', () => {
            expect(retailerDemLists().find(Loading).length).toBe(1);
        });   
    });
});