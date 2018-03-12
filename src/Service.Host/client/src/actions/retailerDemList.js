import { fetchJson, putJson } from '../helpers/fetchJson';
import { getSelfHref } from '../helpers/utilities';
import config from '../config';
import * as actionTypes from './index';
import { fetchRetailer } from '../actions/retailer';

const requestRetailerDemList = retailerUri => ({
    type: actionTypes.REQUEST_RETAILER_DEM_LIST,
    payload: { retailerUri }
});

const receiveRetailerDemList = data => ({
    type: actionTypes.RECEIVE_RETAILER_DEM_LIST,
    payload: { data }
});

export const fetchRetailerDemListByRetailerUri = (retailerUri, history) => async dispatch => {
    dispatch(requestRetailerDemList(retailerUri));
    try {
        const data = await fetchJson(`${config.appRoot}/sales/dem-stock/retailer-dem-lists?retailerUri=${retailerUri}`);
        dispatch(receiveRetailerDemList(data));
        history.push(getSelfHref(data));
    } catch (e) {
        alert(`Failed to fetch retailer dem list. Error: ${e.message}`);
    }
}

export const fetchRetailerDemList = retailerDemListUri => async dispatch => {    
    dispatch(requestRetailerDemList(retailerDemListUri));
    try {
        const data = await fetchJson(`${config.appRoot}${retailerDemListUri}`);
        dispatch(receiveRetailerDemList(data));
        dispatch(fetchRetailer(data.retailerUri));
    } catch (e) {
        alert(`Failed to fetch retailer dem list. Error: ${e.message}`);
    }
}