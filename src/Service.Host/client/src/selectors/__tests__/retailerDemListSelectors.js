import { getRetailerDemList, getRetailerDemListRetailerUri, getRetailerDemListLoading } from '../retailerDemListSelectors';

describe('when selecting retailer dem list loading', () => {
    test('should return loading', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: true,
                item: null
            }
        }

        const expected = true;

        expect(getRetailerDemListLoading(state)).toEqual(expected);
    });
});

describe('when selecting retailer dem list', () => {
    test('should return retailer dem list', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerUri: '/retailers/734',
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/150',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        }

        const expectedResult = {
            retailerUri: '/retailers/734',
            lastReviewedOn: '2018-03-09T00:00:00.0000000',
            rootProducts: [
                {
                    rootProductUri: '/products/root-products/150',
                    quantity: 3,
                    updatedOn: '2018-03-09T00:00:00.0000000',
                    links: null
                }
            ],
            links: [
                {
                    href: '/retailers/734/dem-stock',
                    rel: 'self'
                }
            ]
        }
        expect(getRetailerDemList(state)).toEqual(expectedResult);
    });
});

describe('when selecting retailer dem list but not found', () => {
    test('should return null', () => {
        const retailerDemList = {}

        expect(getRetailerDemList(retailerDemList)).toEqual(null);
    });
});

describe('when selecting retailer uri', () => {
    test('should return retailer uri', () => {
        const state = {
            retailerDemList: {
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/150',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        }

        const expected = '/retailers/734';

        expect(getRetailerDemListRetailerUri(state)).toEqual(expected);
    });
});