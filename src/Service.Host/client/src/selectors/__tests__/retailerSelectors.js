import { getRetailerName } from '../retailerSelectors';

describe('when selecting retailer', () => {
    test('should return retailer name', () => {

        const state = {
            retailer: {
                retailerDemListUri: '/retailers/1',
                loading: false,
                item: {
                    name: 'Tyson Newcastle'
                }
            }
        }

        const expectedResult = 'Tyson Newcastle';
        expect(getRetailerName(state)).toEqual(expectedResult);
    });
});

describe('when selecting retailer but not found', () => {
    test('should return null', () => {
        const retailer = {}

        expect(getRetailerName(retailer)).toEqual(null);
    });
});