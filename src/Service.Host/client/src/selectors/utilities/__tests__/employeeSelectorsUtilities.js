import { getEmployeeUris, getEmployee, getEmployeeName } from '../employeeSelectorUtilities';

describe('when selecting employee Uris', () => {
    test('should return uris', () => {
        const employees = {
            loading: false,
            items: [
                {
                    id: 33067,
                    firstName: 'Teddy',
                    lastName: 'Barton',
                    userName: 'teddyb',
                    emailAddress: 'teddy.barton@linn.co.uk',
                    href: '/employees/33067',
                    fullName: 'Teddy Barton',
                    links: [
                        {
                            href: '/employees/33067',
                            rel: 'self'
                        }
                    ]
                },
                {
                    id: 33048,
                    firstName: 'Peter',
                    lastName: 'Beardsley',
                    userName: 'peterb',
                    emailAddress: 'peter.beardsley@linn.co.uk',
                    href: '/employees/33048',
                    fullName: 'Peter Beardsley',
                    links: [
                        {
                            href: '/employees/33048',
                            rel: 'self'
                        }
                    ]
                },
                {
                    id: 33049,
                    firstName: 'Steve',
                    lastName: 'Mclaren',
                    userName: 'stevem',
                    emailAddress: 'steve.mclaren@linn.co.uk',
                    href: '/employees/33049',
                    fullName: 'Steve Mclaren',
                    links: [
                        {
                            href: '/employees/33049',
                            rel: 'self'
                        }
                    ]
                }
            ]
        };

        const expected = ['/employees/33067', '/employees/33048', '/employees/33049'];

        expect(getEmployeeUris(employees)).toEqual(expected);
    });
});

describe('when selecting employee', () => {
    test('should return employee', () => {
        const employees = {
            loading: false,
            items: [
                {
                    id: 33067,
                    firstName: 'Teddy',
                    lastName: 'Barton',
                    userName: 'teddyb',
                    emailAddress: 'teddy.barton@linn.co.uk',
                    href: '/employees/33067',
                    fullName: 'Teddy Barton',
                    links: [
                        {
                            href: '/employees/33067',
                            rel: 'self'
                        }
                    ]
                },
                {
                    id: 33048,
                    firstName: 'Peter',
                    lastName: 'Beardsley',
                    userName: 'peterb',
                    emailAddress: 'peter.beardsley@linn.co.uk',
                    href: '/employees/33048',
                    fullName: 'Peter Beardsley',
                    links: [
                        {
                            href: '/employees/33048',
                            rel: 'self'
                        }
                    ]
                },
                {
                    id: 33049,
                    firstName: 'Steve',
                    lastName: 'Mclaren',
                    userName: 'stevem',
                    emailAddress: 'steve.mclaren@linn.co.uk',
                    href: '/employees/33049',
                    fullName: 'Steve Mclaren',
                    links: [
                        {
                            href: '/employees/33049',
                            rel: 'self'
                        }
                    ]
                }
            ]
        };

        const expected = {
            id: 33067,
            firstName: 'Teddy',
            lastName: 'Barton',
            userName: 'teddyb',
            emailAddress: 'teddy.barton@linn.co.uk',
            href: '/employees/33067',
            fullName: 'Teddy Barton',
            links: [
                {
                    href: '/employees/33067',
                    rel: 'self'
                }
            ]
        }

        expect(getEmployee('/employees/33067', employees)).toEqual(expected);
    });
});

describe('when selecting employee name', () => {
    test('should return name', () => {

        const employees = {
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
        };

        const expectedResult = 'Teddy Barton';
        expect(getEmployeeName('/employees/3306', employees)).toEqual(expectedResult);
    });
});
