import { getActivities } from '../activitySelectors';

describe('when selecting activites', () => {
    test('should return activites with root product and employee names', () => {
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
            rootProducts: {
                loading: false,
                items: [
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
                ]
            },
            employees: {
                loading: false,
                items: [
                    {
                        id: 3306,
                        firstName: 'Teddy',
                        lastName: 'Barton',
                        userName: 'teddyb',
                        emailAddress: 'teddy.barton@linn.co.uk',
                        href: '/employees/3306',
                        fullName: 'Teddy Barton',
                        links: [
                            {
                                href: '/employees/3306',
                                rel: 'self'
                            }
                        ]
                    },
                    {
                        id: 123,
                        firstName: 'Peter',
                        lastName: 'Beardsley',
                        userName: 'peterb',
                        emailAddress: 'peter.beardsley@linn.co.uk',
                        href: '/employees/123',
                        fullName: 'Peter Beardsley',
                        links: [
                            {
                                href: '/employees/123',
                                rel: 'self'
                            }
                        ]
                    }
                ]
            }
        }

        const expectedResult = [
            {
                rootProductUri: '/products/root-products/175',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: '/employees/3306',
                updatedByName: 'Teddy Barton',
                changedOn: '2018-03-14T09:08:36.0229120',
                links: null,
                rootProductName: 'MAJIK DS/2'
            },
            {
                quantity: 1,
                activityType: 'UpdateLastReviewedOnActivity',
                updatedByUri: '/employees/123',
                updatedByName: 'Peter Beardsley',
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null,
                rootProductName: null
            },
            {
                rootProductUri: '/products/root-products/901',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                updatedByName: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null,
                rootProductName: 'KLIMAX DSM/3'
            }
        ]

        expect(getActivities(state)).toEqual(expectedResult);
    });
});