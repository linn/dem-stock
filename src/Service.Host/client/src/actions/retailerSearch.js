import { fetchJson } from '../helpers/fetchJson';
import config from '../config';
import * as actionTypes from './index';

const requestRetailers = searchTerm => ({
    type: actionTypes.REQUEST_RETAILERS,
    payload: { searchTerm }
});

const receiveRetailers = (searchTerm, data) => ({
    type: actionTypes.RECEIVE_RETAILERS,
    payload: { searchTerm, retailers: data ? data.retailers : [] }
});

export const clearRetailerSearch = () => ({
    type: actionTypes.CLEAR_RETAILER_SEARCH,
    payload: {}
});

export const searchRetailers = searchTerm => async dispatch => {
    if (searchTerm) {
        dispatch(requestRetailers(searchTerm));
        try {
            const data = await fetchJson(`${config.proxyRoot}/retailers?name=${searchTerm}`);
            dispatch(receiveRetailers(searchTerm, data));
        } catch (e) {
            alert(`Failed to search for retailer. Error: ${e.message}`);
        }
    } else {
        dispatch(receiveRetailers('', { retailers: [] }));
    }
};