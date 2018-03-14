import rootProducts from '../rootProducts';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('root products reducer', () => {
  
    test('when requesting root products with root products in state', () => {
        const state = [];

        const action = {
            type: actionTypes.REQUEST_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/1',
                    '/products/root-products/2',
                    '/products/root-products/3',
                    '/products/root-products/4'
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/4',
                loading: true,
                item: null
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when requesting products with some root products in state', () => {
        const state = [{
            rootProductUri: '/products/root-products/1',
            loading: false,
            item: {
                href: '/products/root-products/1',
                type: 'root-product',
                name: 'DORIK/E/1',
                description: 'DORIK AMPLIFIER MODULE AND STAND FOR AKUDORIK LOUDSPEAKER WITH KATALYST'
            }
        }];

        const action = {
            type: actionTypes.REQUEST_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/1',
                    '/products/root-products/2',
                    '/products/root-products/3',
                    '/products/root-products/4'
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER MODULE AND STAND FOR AKUDORIK LOUDSPEAKER WITH KATALYST'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/4',
                loading: true,
                item: null
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving products', () => {
        const state = [
            {
                rootProductUri: '/products/root-products/1',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            }
        ];

        const action = {
            type: actionTypes.RECEIVE_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/1',
                    '/products/root-products/2',
                    '/products/root-products/3'
                ],
                data: [
                    {
                        href: '/products/root-products/1',
                        type: 'root-product',
                        name: 'DORIK/E/1',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: false,
                item: {
                    href: '/products/root-products/2',
                    type: 'root-product',
                    name: 'DORIK/E/2',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: false,
                item: {
                    href: '/products/root-products/3',
                    type: 'root-product',
                    name: 'DORIK/E/3',
                    description: 'DORIK AMPLIFIER'
                }
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving products with some already in state', () => {
        const state = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            }
        ];

        const action = {
            type: actionTypes.RECEIVE_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/2',
                    '/products/root-products/3'
                ],
                data: [
                    {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: false,
                item: {
                    href: '/products/root-products/2',
                    type: 'root-product',
                    name: 'DORIK/E/2',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: false,
                item: {
                    href: '/products/root-products/3',
                    type: 'root-product',
                    name: 'DORIK/E/3',
                    description: 'DORIK AMPLIFIER'
                }
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving item already in state', () => {
        const state = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            }
        ];

        const action = {
            type: actionTypes.RECEIVE_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/1',
                    '/products/root-products/2',
                    '/products/root-products/3'
                ],
                data: [
                    {
                        href: '/products/root-products/1',
                        type: 'root-product',
                        name: 'RP/2',
                        description: 'ANOTHER AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'RP/2',
                    description: 'ANOTHER AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: false,
                item: {
                    href: '/products/root-products/2',
                    type: 'root-product',
                    name: 'DORIK/E/2',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: false,
                item: {
                    href: '/products/root-products/3',
                    type: 'root-product',
                    name: 'DORIK/E/3',
                    description: 'DORIK AMPLIFIER'
                }
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving dupicate items', () => {
        const state = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: true,
                item: null
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: true,
                item: null
            }
        ];

        const action = {
            type: actionTypes.RECEIVE_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/2',
                    '/products/root-products/2',
                    '/products/root-products/3'
                ],
                data: [
                    {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    },
                    {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                ]
            }
        };

        const expected = [
            {
                rootProductUri: '/products/root-products/1',
                loading: false,
                item: {
                    href: '/products/root-products/1',
                    type: 'root-product',
                    name: 'DORIK/E/1',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/2',
                loading: false,
                item: {
                    href: '/products/root-products/2',
                    type: 'root-product',
                    name: 'DORIK/E/2',
                    description: 'DORIK AMPLIFIER'
                }
            },
            {
                rootProductUri: '/products/root-products/3',
                loading: false,
                item: {
                    href: '/products/root-products/3',
                    type: 'root-product',
                    name: 'DORIK/E/3',
                    description: 'DORIK AMPLIFIER'
                }
            }
        ];

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });
});
