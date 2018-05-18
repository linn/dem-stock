import rootProducts from '../rootProducts';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('root products reducer', () => {

    test('when requesting root products with no root products in state', () => {
        const state = {
            loading: false,
            items: []
        }

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

        const expected = {
            loading: true,
            items: []
        }

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when requesting root products with root products in state', () => {
        const state = {
            loading: false,
            items: [
                {
                    rootProductUri: '/products/root-products/1',
                    loading: false,
                    item: null
                },
                {
                    rootProductUri: '/products/root-products/2',
                    loading: false,
                    item: null
                },
            ]
        }

        const action = {
            type: actionTypes.REQUEST_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/3',
                    '/products/root-products/4'
                ]
            }
        };

        const expected = {
            loading: true,
            items: [
                {
                    rootProductUri: '/products/root-products/1',
                    loading: false,
                    item: null
                },
                {
                    rootProductUri: '/products/root-products/2',
                    loading: false,
                    item: null
                },
            ]
        }

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving root products with no root products in state', () => {
        const state = {
            loading: true,
            items: []
        }

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

        const expected = {
            loading: false,
            items: [
                {
                    loading: false,
                    rootProductUri: '/products/root-products/1',
                    item: {
                        href: '/products/root-products/1',
                        type: 'root-product',
                        name: 'DORIK/E/1',
                        description: 'DORIK AMPLIFIER'
                    },
                },
                {
                    loading: false,
                    rootProductUri: '/products/root-products/2',
                    item: {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    }
                },
                {
                    loading: false,
                    rootProductUri: '/products/root-products/3',
                    item: {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                }
            ]
        }

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

    test('when receiving root products with root products in state', () => {
        const state = {
            loading: true,
            items: [
                {
                    loading: false,
                    rootProductUri: '/products/root-products/1',
                    item: {
                        href: '/products/root-products/1',
                        type: 'root-product',
                        name: 'DORIK/E/1',
                        description: 'DORIK AMPLIFIER'
                    },
                },
                {
                    loading: false,
                    rootProductUri: '/products/root-products/2',
                    item: {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    }
                },
            ]
        }

        const action = {
            type: actionTypes.RECEIVE_ROOT_PRODUCTS,
            payload: {
                rootProductUris: [
                    '/products/root-products/3'
                ],
                data: [
                    {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                ]
            }
        };

        const expected = {
            loading: false,
            items: [
                {
                    loading: false,
                    rootProductUri: '/products/root-products/1',
                    item: {
                        href: '/products/root-products/1',
                        type: 'root-product',
                        name: 'DORIK/E/1',
                        description: 'DORIK AMPLIFIER'
                    },
                },
                {
                    loading: false,
                    rootProductUri: '/products/root-products/2',
                    item: {
                        href: '/products/root-products/2',
                        type: 'root-product',
                        name: 'DORIK/E/2',
                        description: 'DORIK AMPLIFIER'
                    }
                },
                {
                    loading: false,
                    rootProductUri: '/products/root-products/3',
                    item: {
                        href: '/products/root-products/3',
                        type: 'root-product',
                        name: 'DORIK/E/3',
                        description: 'DORIK AMPLIFIER'
                    }
                }
            ]
        }

        deepFreeze(state);

        expect(rootProducts(state, action)).toEqual(expected);
    });

});