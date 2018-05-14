import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

const clearSearchRootProducts = () => ({
    type: actionTypes.CLEAR_SEARCH_ROOT_PRODUCTS,
    payload: {}
});

export const showRootProductSearch = () => ({
    type: actionTypes.SHOW_ROOT_PRODUCT_SEARCH,
    payload: {}
});

export const hideRootProductSearch = () => ({
    type: actionTypes.HIDE_ROOT_PRODUCT_SEARCH,
    payload: {}
});

const setSearchTerm = searchTerm => ({
    type: actionTypes.SET_ROOT_PRODUCT_SEARCH_TERM,
    payload: searchTerm
});

export const setRootProductSearchTerm = searchTerm => dispatch => {
    dispatch(setSearchTerm(searchTerm));
    dispatch(searchRootProducts());
};

const performRootProductsSearch = searchTerm => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}/products/?query=${searchTerm}&filters=root-product&showPhasedOut=true`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_SEARCH_ROOT_PRODUCTS,
                payload: {}
            },
            {
                type: actionTypes.RECEIVE_SEARCH_ROOT_PRODUCTS,
                payload: async (action, state, res) => ({ searchTerm, rootProducts: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Root Products - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});

let timeoutId;

const searchRootProducts = () => async (dispatch, getState) => {
    const { searchTerm } = getState().rootProductSearch;

    if (searchTerm) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async () => {
            dispatch(performRootProductsSearch(searchTerm));
        }, 500);
    } else {
        dispatch(clearSearchRootProducts());
    }
};