import { getActivityRootProductUris, getActivities } from '../activitySelectors';

describe('when selecting activity root product uris', () => {
    test('should return uris', () => {
       
        const activities = [
            {
                rootProductUri: '/products/root-products/175',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:08:36.0229120',
                links: null
            },
            {                
                quantity: 1,
                activityType: 'UpdateLastReviewedOnActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            },
            {
                rootProductUri: '/products/root-products/901',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            },
        ]

        const expectedResult = ['/products/root-products/175', '/products/root-products/901'];
        expect(getActivityRootProductUris(activities)).toEqual(expectedResult);
    });
});

describe('when getting activites', () => {
    test('should return activites with root product names', () => {        
        const activities = [
            {
                rootProductUri: '/products/root-products/175',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:08:36.0229120',
                links: null
            },
            {                
                quantity: 1,
                activityType: 'UpdateLastReviewedOnActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            },
            {
                rootProductUri: '/products/root-products/901',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            }
        ]

        const rootProducts = [
            {
                rootProductUri: "/products/root-products/175",
                loading: false,
                item: {
                    name: 'MAJIK DS/2',
                    href: '/products/root-products/175'
                }
            },
            {
                rootProductUri: "/products/root-products/901",
                loading: false,
                item: {
                    name: 'KLIMAX DSM/3',
                    href: '/products/root-products/901'
                }
            }
        ];

        const expectedResult = [
            {
                rootProductUri: '/products/root-products/175',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:08:36.0229120',
                links: null,
                rootProductName: 'MAJIK DS/2'
            },
            {                
                quantity: 1,
                activityType: 'UpdateLastReviewedOnActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null,
                rootProductName: null
            },
            {
                rootProductUri: '/products/root-products/901',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null,
                rootProductName: 'KLIMAX DSM/3'
            }
        ]

        expect(getActivities(activities, rootProducts)).toEqual(expectedResult);
    });
});