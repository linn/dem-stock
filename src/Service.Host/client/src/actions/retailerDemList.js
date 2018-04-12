import { fetchJson, putJson } from '../helpers/fetchJson';
import { getSelfHref } from '../helpers/utilities';
import config from '../config';
import * as actionTypes from './index';
import { fetchRetailer } from './retailer';
import { fetchRootProducts } from './rootProducts';

const requestRetailerDemList = retailerUri => ({
    type: actionTypes.REQUEST_RETAILER_DEM_LIST,
    payload: { retailerUri }
});

const receiveRetailerDemList = data => ({
    type: actionTypes.RECEIVE_RETAILER_DEM_LIST,
    payload: { data }
});

const requestSetRootProduct = (rootProductUri, quantity) => ({
    type: actionTypes.REQUEST_SET_ROOT_PRODUCT,
    payload: { rootProductUri, quantity }
});

const receiveSetRootProduct = data => ({
    type: actionTypes.RECEIVE_SET_ROOT_PRODUCT,
    payload: { data }
});

const requestUpdateDemListDetails = retailerUri => ({
    type: actionTypes.REQUEST_UPDATE_DEM_LIST_DETAILS,
    payload: { retailerUri }
});

const receiveUpdateDemListDetails = data => ({
    type: actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS,
    payload: { data }
});

export const fetchRetailerDemList = retailerUri => async dispatch => {
    dispatch(requestRetailerDemList(retailerUri));
    try {
        const data = await fetchJson(`${config.appRoot}${retailerUri}/dem-stock`);
        dispatch(receiveRetailerDemList(data));
        dispatch(fetchRetailer(retailerUri));
        const activityRootProdUris = data.activities.map(a => a.rootProductUri).filter(r => r !== undefined);
        const rootProductUris = data.rootProducts.map(rp => rp.rootProductUri).concat(activityRootProdUris);
        dispatch(fetchRootProducts(rootProductUris));
    } catch (e) {
        alert(`Failed to fetch retailer dem list. Error: ${e.message}`);
    }
}

export const setRootProduct = (rootProductUri, quantity, retailerUri) => async dispatch => {
    dispatch(requestSetRootProduct(rootProductUri, quantity));
    try {
        const body = { rootProductUri, quantity };
        const data = await putJson(`${config.appRoot}${retailerUri}/dem-stock/products`, body);
        dispatch(receiveSetRootProduct(data));
        dispatch(fetchRetailerDemList(retailerUri));
    } catch (e) {
        alert(`Failed to set root product. Error: ${e.message}`);
    }
}

export const updateDemListDetails = (lastReviewedOn, retailerUri) => async dispatch => {
    dispatch(requestUpdateDemListDetails(retailerUri));
    try {
        const body = { updatedDate: lastReviewedOn };
        const data = await putJson(`${config.appRoot}${retailerUri}/dem-stock`, body);
        dispatch(receiveUpdateDemListDetails(data));
    } catch (e) {
        alert(`Failed to update dem list details. Error: ${e.message}`);
    }
}