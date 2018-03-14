import rootProductSearch from '../rootProductSearch';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('root products search reducer', () => {
    test('when requesting root products', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: 'product1'
                }
            ],
            visible: false,
            searchTerm: 'prod'
        };

        const action = {
            type: actionTypes.REQUEST_SEARCH_ROOT_PRODUCTS,
            payload: {}
        };

        const expected = {
            visible: false,
            loading: true,
            searchTerm: 'prod',
            items: []
        }

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when receiving root products', () => {
        const state = {
            visible: false,
            loading: true,
            searchTerm: 'newProductSearch',
            items: []
        }

        const action = {
            type: actionTypes.RECEIVE_SEARCH_ROOT_PRODUCTS,
            payload: {
                searchTerm: 'newProductSearch',
                rootProducts: [
                    {
                        name: 'prod1'
                    },
                    {
                        name: 'prod2'
                    }
                ]
            }
        };

        const expected = {
            visible: false,
            loading: false,
            searchTerm: 'newProductSearch',
            items: [
                {
                    name: 'prod1'
                },
                {
                    name: 'prod2'
                }
            ]
        };

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when receiving products when the search term has subsequently changed', () => {
        const state = {
            visible: false,
            loading: true,
            searchTerm: 'revisedProductSearch',
            items: []
        }

        const action = {
            type: actionTypes.RECEIVE_SEARCH_ROOT_PRODUCTS,
            payload: {
                searchTerm: 'originalProductSearch',
                products: [
                    {
                        name: 'prod1'
                    },
                    {
                        name: 'prod2'
                    }
                ]
            }
        };

        const expected = {
            visible: false,
            loading: true,
            searchTerm: 'revisedProductSearch',
            items: []
        };

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when setting search term', () => {
        const state = {
            loading: false,
            items: [],
            visible: true,
            searchTerm: 'old search term'
        };

        const action = {
            type: actionTypes.SET_ROOT_PRODUCT_SEARCH_TERM,
            payload: 'new search term'
        };

        const expected = {
            loading: false,
            items: [],
            visible: true,
            searchTerm: 'new search term'
        }

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when showing product search', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: 'product1'
                }
            ],
            visible: false,
            searchTerm: 'prod'
        };

        const action = {
            type: actionTypes.SHOW_ROOT_PRODUCT_SEARCH,
            payload: null
        };

        const expected = {
            visible: true,
            loading: false,
            searchTerm: '',
            items: []
        }

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when hiding product search', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: 'product1'
                }
            ],
            visible: true,
            searchTerm: 'prod'
        };

        const action = {
            type: actionTypes.HIDE_ROOT_PRODUCT_SEARCH
        };

        const expected = {
            visible: false,
            loading: false,
            searchTerm: '',
            items: []
        };

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });
});