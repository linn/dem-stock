import { getRetailerDemListRootProductUris, getDemListUpdating } from '../retailerDemListSelectorUtilities';

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
        }

        const expected = ['/products/root-products/262', '/products/root-products/1841'];

        expect(getRetailerDemListRootProductUris(retailerDemList)).toEqual(expected);
    });
});

describe('when selecting retailer dem list updating', () => {
    test('should return false when loading and no item', () => {
        const retailerDemList = {
            retailerUri: '/retailers/734',
            loading: true,
            item: {}
        };

        expect(getDemListUpdating(retailerDemList)).toEqual(false);
    });

    test('should return false when not loading and no item', () => {
        const retailerDemList = {
            retailerUri: '/retailers/734',
            loading: false,
            item: {}
        };

        expect(getDemListUpdating(retailerDemList)).toEqual(false);
    });

    test('should return true when loading and item present', () => {
        const retailerDemList = {
            retailerUri: '/retailers/734',
            loading: true,
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

        expect(getDemListUpdating(retailerDemList)).toEqual(true);
    });

    test('should return true when not loading and item present', () => {
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

        expect(getDemListUpdating(retailerDemList)).toEqual(false);
    });

});