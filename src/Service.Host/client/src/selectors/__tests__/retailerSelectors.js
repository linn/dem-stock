﻿import { getRetailerName } from '../retailerSelectors';

describe('when selecting retailer', () => {
    test('should return retailer name', () => {
       
        const retailer = {
            retailerDemListUri: '/retailers/1',
            loading: false,
            item: {
               name: 'Tyson Newcastle'
            }
        };

        const expectedResult = 'Tyson Newcastle';
        expect(getRetailerName(retailer)).toEqual(expectedResult);
    });
});

describe('when retailer is loading', () => {
    test('should return null', () => {

        const retailer = {
            retailerDemListUri: '/retailers/1',
            loading: true,
            item: {
                name: 'Tyson Newcastle'
            }
        };

        expect(getRetailerName(retailer)).toEqual(null);
    });
});

describe('when selecting retailer but not found', () => {
    test('should return null', () => {
        const retailer = {}

        expect(getRetailerName(retailer)).toEqual(null);
    });
});