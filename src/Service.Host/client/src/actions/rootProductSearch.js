import { fetchJson } from '../helpers/fetchJson';
import config from '../config';
import * as actionTypes from './index';

const requestSearchRootProducts= () => ({
    type: actionTypes.REQUEST_SEARCH_ROOT_PRODUCTS,
    payload: {}
});

const receiveSearchRootProducts = (rootProducts, searchTerm) => ({
    type: actionTypes.RECEIVE_SEARCH_ROOT_PRODUCTS,
    payload: { rootProducts, searchTerm }
});

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

let timeoutId;

const searchRootProducts = () => async (dispatch, getState) => {
    const { searchTerm } = getState().rootProductSearch;

    if (searchTerm) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
            dispatch(requestSearchRootProducts());
            try {
                const data = await fetchJson(`${config.proxyRoot}/products/?query=${searchTerm}&filters=root-product&showPhasedOut=true`);
                dispatch(receiveSearchRootProducts(data, searchTerm));
            } catch (e) {
                alert(`Failed to search for root products. Error: ${e.message}`);
            }
        }, 500);
    } else {
        dispatch(clearSearchRootProducts());
    }
};

