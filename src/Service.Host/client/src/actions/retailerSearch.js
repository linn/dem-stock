import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const clearRetailerSearch = () => ({
    type: actionTypes.CLEAR_RETAILER_SEARCH,
    payload: {}
});

let timeoutId;

export const searchRetailers = searchTerm => async dispatch => {
    if (searchTerm) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async () => {
            dispatch(performRetailerSearch(searchTerm));
        }, 500);
    } else {
        dispatch(clearRetailerSearch());
    }
};

const performRetailerSearch = searchTerm => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}/retailers?name=${searchTerm}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_RETAILERS,
                payload: { searchTerm }
            },
            {
                type: actionTypes.RECEIVE_RETAILERS,
                payload: async (action, state, res) => ({ searchTerm, data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailers - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});