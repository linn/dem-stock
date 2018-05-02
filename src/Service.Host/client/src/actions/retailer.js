import { fetchJson } from '../helpers/fetchJson';
import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

const requestRetailer = retailerUri => ({
    type: actionTypes.REQUEST_RETAILER,
    payload: { retailerUri }
});

const receiveRetailer = data => ({
    type: actionTypes.RECEIVE_RETAILER,
    payload: { data }
});

export const fetchRetailer = retailerUri => async dispatch => {
    dispatch(requestRetailer(retailerUri));    
    try {
        const data = await fetchJson(`${config.proxyRoot}${retailerUri}`);
        dispatch(receiveRetailer(data));
    } catch (e) {
        alert(`Failed to fetch retailer. Error: ${e.message}`);
    }
}