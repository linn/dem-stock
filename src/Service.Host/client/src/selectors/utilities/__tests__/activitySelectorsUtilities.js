import { getActivityRootProductUris, getActivityEmployeeUris, getActivitiesLoading, getActivitiesUpdating } from '../activitySelectorUtilities';

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
        expect(getActivityEmployeeUris(activities.items)).toEqual(expectedResult);
    });
});

describe('when selecting activities loading', () => {
    test('should return true when loading and no activities in state', () => {

        const activities = {
            loading: true,
            items: []
        };

        expect(getActivitiesLoading(activities)).toEqual(true);
    });

    test('should return false when not loading and no activities in state', () => {

        const activities = {
            loading: false,
            items: []
        };

        expect(getActivitiesLoading(activities)).toEqual(false);
    });

    test('should return false when not loading and root products in state', () => {

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
        };

        expect(getActivitiesLoading(activities)).toEqual(false);
    });

    test('should return false when loading and root products in state', () => {

        const activities = {
            loading: true,
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
        };

        expect(getActivitiesLoading(activities)).toEqual(false);
    });

});

describe('when selecting activities updating', () => {
    test('should return false when loading and no activities in state', () => {

        const activities = {
            loading: true,
            items: []
        };

        expect(getActivitiesUpdating(activities)).toEqual(false);
    });

    test('should return false when not loading and no activities in state', () => {

        const activities = {
            loading: false,
            items: []
        };

        expect(getActivitiesUpdating(activities)).toEqual(false);
    });

    test('should return true when loading and activities in state', () => {

        const activities = {
            loading: true,
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

        expect(getActivitiesUpdating(activities)).toEqual(true);
    });

    test('should return false when not loading and activities in state', () => {

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

        expect(getActivitiesUpdating(activities)).toEqual(false);
    });

});
