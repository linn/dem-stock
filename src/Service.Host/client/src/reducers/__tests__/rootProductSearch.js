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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
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
            includePhasedOut: false,
            searchTerm: 'prod'
        };

        const action = {
            type: actionTypes.HIDE_ROOT_PRODUCT_SEARCH
        };

        const expected = {
            visible: false,
            loading: false,
            searchTerm: '',
            includePhasedOut: false,
            items: []
        };

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });

    test('when toggling phased out', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: 'product1'
                }
            ],
            visible: true,
            includePhasedOut: false,
            searchTerm: 'prod'
        };

        const action = {
            type: actionTypes.TOGGLE_INCLUDE_PHASED_OUT,
            payload: true
        };

        const expected = {
            visible: true,
            loading: false,
            searchTerm: 'prod',
            includePhasedOut: true,
            items: [
                {
                    name: 'product1'
                }
            ]
        };

        deepFreeze(state);

        expect(rootProductSearch(state, action)).toEqual(expected);
    });
});