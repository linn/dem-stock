import { getActivityRootProductUris, getActivityEmployeeUris } from '../activitySelectorUtilities';

describe('when selecting activity root product uris', () => {
    test('should return uris', () => {

        const activities = {
            loading: false,
            items: [
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
        }

        const expectedResult = ['/products/root-products/175', '/products/root-products/901'];
        expect(getActivityRootProductUris(activities)).toEqual(expectedResult);
    });
});

describe('when selecting activity employee uris', () => {
    test('should return uris', () => {
        const activities = {
            loading: false,
            items: [
                {
                    rootProductUri: '/products/root-products/175',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: '/employees/241',
                    changedOn: '2018-03-14T09:08:36.0229120',
                    links: null
                },
                {
                    quantity: 1,
                    activityType: 'UpdateLastReviewedOnActivity',
                    updatedByUri: '/employees/123',
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
        }

        const expectedResult = ['/employees/241', '/employees/123'];
        expect(getActivityEmployeeUris(activities)).toEqual(expectedResult);
    });
});
