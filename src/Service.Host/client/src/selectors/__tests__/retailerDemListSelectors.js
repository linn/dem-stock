import { getRetailerDemList, getRetailerDemListRetailerUri, getRetailerDemListRootProductUris } from '../retailerDemListSelectors';

describe('when selecting retailer dem list', () => {
    test('should return retailer dem list', () => {
       
        const retailerDemList = {
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
        };

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
        expect(getRetailerDemList(retailerDemList)).toEqual(expectedResult);
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
        const retailerDemList = {
            retailerUri: '/retailers/734',
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
        };

        const expected = '/retailers/734';

        expect(getRetailerDemListRetailerUri(retailerDemList)).toEqual(expected);
    });
});

describe('when selecting retailer dem list root product uris', () => {
    test('should return root product uris', () => {
        const retailerDemList = {
            retailerUri: '/retailers/734',
            loading: false,
            item: {
                retailerId: 734,
                lastReviewedOn: '2018-09-09T00:00:00.0000000',
                rootProducts: [
                    {
                        rootProductUri: '/products/root-products/262',
                        quantity: 1,
                        updatedOn: '2018-04-24T15:17:23.7848480',
                        links: null
                    },
                    {
                        rootProductUri: '/products/root-products/1841',
                        quantity: 1,
                        updatedOn: '2018-03-16T14:43:11.3798430',
                        links: null
                    },
                ]
            }
        };

        const expected = ['/products/root-products/262', '/products/root-products/1841'];

        expect(getRetailerDemListRootProductUris(retailerDemList)).toEqual(expected);
    });
});