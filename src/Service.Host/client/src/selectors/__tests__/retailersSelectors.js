import { getRetailer } from '../retailersSelectors';

describe('when selecting retailer', () => {
    test('should return retailer', () => {

        const state = {
            retailers: {
                items: [
                    {
                        id : 111,
                        name: 'Something'
                    },
                    {
                        id: 222,
                        name: 'Something else'
                    }
                ]
            }
        }

        const expectedResult = {
            id: 111,
            name: 'Something'
        };
        expect(getRetailer(111, state.retailers)).toEqual(expectedResult);
    });
});

describe('when selecting retailer but not found', () => {
    test('should return null', () => {
        const state = {
            retailers: {
                items: [
                    {
                        id: 111,
                        name: 'Something'
                    },
                    {
                        id: 222,
                        name: 'Something else'
                    }
                ]
            }
        }

        expect(getRetailer(333, state.retailers)).toEqual(null);
    });
});

describe('when selecting retailer but not loaded', () => {
    test('should return null', () => {
        const state = {
            retailers: {}
        }

        expect(getRetailer(111, state.retailers)).toEqual(null);
    });
});