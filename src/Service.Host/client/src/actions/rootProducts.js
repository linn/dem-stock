import { postJson } from '../helpers/fetchJson';
import config from '../config';
import * as actionTypes from './index';

const requestRootProducts = rootProductUris => ({
    type: actionTypes.REQUEST_ROOT_PRODUCTS,
    payload: { rootProductUris }
});

const receiveRootProducts = (rootProductUris, data) => ({
    type: actionTypes.RECEIVE_ROOT_PRODUCTS,
    payload: { rootProductUris, data }
});

export const fetchRootProducts = (rootProductUris = []) => async dispatch => {
    dispatch(requestRootProducts(rootProductUris));

    const body = {
        urls: rootProductUris,
        includePhasedOut: true,
        retrieveChildren: false
    }
    try {
        const data = await postJson(`${config.proxyRoot}/products/batch-get`, body);
        dispatch(receiveRootProducts(rootProductUris, data));
    } catch (e) {
        alert(`Failed to fetch root products. Error: ${e.message}`);
    }
};

