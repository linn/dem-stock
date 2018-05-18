import employees from '../employees';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('employees reducer', () => {

    test('when requesting an employee', () => {
        const state = {
            loading: false,
            items: []
        };

        const action = {
            type: actionTypes.REQUEST_EMPLOYEE_NAME,
            payload: {
                employeeUri: '/employees/3306'
            }
        };

        const expected = {
            loading: true,
            items: []
        };

        deepFreeze(state);

        expect(employees(state, action)).toEqual(expected);
    });

    test('when receiving an employee', () => {
        const state = {
            loading: true,
            items: []
        };

        const action = {
            type: actionTypes.RECEIVE_EMPLOYEE_NAME,
            payload: {
                data: {
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
                }
            }
        };

        const expected = {
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
                }
            ]
        };

        deepFreeze(state);

        expect(employees(state, action)).toEqual(expected);
    });

    test('when requesting an employee with existing in state', () => {
        const state = {
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
                }
            ]
        };

        const action = {
            type: actionTypes.REQUEST_EMPLOYEE_NAME,
            payload: {
                employeeUri: '/employees/123'
            }
        };

        const expected = {
            loading: true,
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
                }
            ]
        };

        deepFreeze(state);

        expect(employees(state, action)).toEqual(expected);
    });

    test('when receiving an employee with existing in state', () => {
        const state = {
            loading: true,
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
                }
            ]
        };

        const action = {
            type: actionTypes.RECEIVE_EMPLOYEE_NAME,
            payload: {
                data: {
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
            }
        };

        const expected = {
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

        deepFreeze(state);

        expect(employees(state, action)).toEqual(expected);
    });

});