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

export const fetchRetailerDemList = retailerUri => async dispatch => {    
    dispatch(requestRetailerDemList(retailerUri));
    try {
        const data = await fetchJson(`${config.appRoot}${retailerUri}/dem-stock`);
        dispatch(receiveRetailerDemList(data));
        dispatch(fetchRetailer(retailerUri));
    } catch (e) {
        alert(`Failed to fetch retailer dem list. Error: ${e.message}`);
    }
}