import retailerSearch from '../retailerSearch';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailer search reducer', () => {
    test('when requesting retailer', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: '1'
                }
            ],
            visible: true,
            searchTerm: 'search'
        };

        const action = {
            type: actionTypes.REQUEST_RETAILERS_SEARCH,
            payload: {
                searchTerm: 'new search'
            }
        };

        const expected = {
            visible: true,
            loading: true,
            searchTerm: 'new search',
            items: []
        }

        deepFreeze(state);

        expect(retailerSearch(state, action)).toEqual(expected);
    });

    test('when receiving results', () => {
        const state = {
            visible: true,
            loading: true,
            searchTerm: 'new search',
            items: []
        }

        const action = {
            type: actionTypes.RECEIVE_RETAILERS_SEARCH,
            payload: {
                searchTerm: 'new search',
                data: {
                    retailers: [
                        {
                            name: '1'
                        },
                        {
                            name: '2'
                        }
                    ]
                }
            }
        };

        const expected = {
            visible: true,
            loading: false,
            searchTerm: 'new search',
            items: [
                {
                    name: '1'
                },
                {
                    name: '2'
                }
            ]
        };

        deepFreeze(state);

        expect(retailerSearch(state, action)).toEqual(expected);
    });

    test('when clearing search items', () => {
        const state = {
            loading: false,
            items: [
                {
                    name: '1'
                }
            ],
            visible: true,
            searchTerm: 'search'
        };

        const action = {
            type: actionTypes.CLEAR_RETAILER_SEARCH
        };

        const expected = {
            visible: true,
            loading: false,
            searchTerm: '',
            items: []
        }

        deepFreeze(state);

        expect(retailerSearch(state, action)).toEqual(expected);
    });
});