import { getEmployeesToFetch } from '../employeeSelectors';

describe('when selecting employee uris to fetch', () => {
    test('should return unique uris not in state', () => {

        const state = {
            employees: {
                loading: false,
                items: [
                    {
                        id: 241,
                        firstName: 'Teddy',
                        lastName: 'Barton',
                        userName: 'teddyb',
                        emailAddress: 'teddy.barton@linn.co.uk',
                        href: '/employees/241',
                        fullName: 'Teddy Barton',
                        links: [
                            {
                                href: '/employees/241',
                                rel: 'self'
                            }
                        ]
                    }
                ]
            }
        }

        const activities = [
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
                updatedByUri: '/employees/123',
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            },
            {
                rootProductUri: '/products/root-products/303',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: '/employees/987',
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            },
            {
                rootProductUri: '/products/root-products/909',
                quantity: 1,
                activityType: 'UpdateRootProductActivity',
                updatedByUri: null,
                changedOn: '2018-03-14T09:09:05.9000510',
                links: null
            }
        ]

        const expectedResult = ['/employees/123', '/employees/987'];
        expect(getEmployeesToFetch(state, activities)).toEqual(expectedResult);
    });
});