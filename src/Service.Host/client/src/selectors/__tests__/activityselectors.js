import { getActivities } from '../activitySelectors';

describe('when selecting activites', () => {
    test('should return activites', () => {
        const state = {
            activities: {
                loading: false,
                items: [
                    {
                        rootProductUri: '/products/root-products/175',
                        quantity: 1,
                        activityType: 'UpdateRootProductActivity',
                        updatedByUri: '/employees/3306',
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
                    }
                ]
            },
        }

        const expectedResult = [
            {
                rootProductUri: '/products/root-products/175',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: '/employees/3306',
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
            }
        ]

        expect(getActivities(state)).toEqual(expectedResult);
    });
});