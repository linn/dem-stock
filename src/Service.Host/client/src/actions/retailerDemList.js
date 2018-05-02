import { fetchJson, putJson } from '../helpers/fetchJson';
import { getSelfHref } from '../helpers/utilities';
import config from '../config';
import * as actionTypes from './index';
import { fetchRetailer } from './retailer';
import { fetchRootProducts } from './rootProducts';
import { fetchActivities } from './activities';
import { getActivities } from '../selectors/activitySelectors';
import { CALL_API } from 'redux-api-middleware';

export const fetchRetailerDemListDetails = retailerUri => async (dispatch) => {
    dispatch(fetchRetailerDemList(retailerUri));
    dispatch(fetchRetailer(retailerUri));
}

export const fetchRetailerDemList = retailerUri => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}${retailerUri}/dem-stock`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_RETAILER_DEM_LIST,
                payload: { retailerUri }
            },
            {
                type: actionTypes.RECEIVE_RETAILER_DEM_LIST,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailer Dem List - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ],
    }
});

export const setRootProduct = (rootProductUri, quantity, retailerUri) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}${retailerUri}/dem-stock/products`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        },
        body: JSON.stringify({ rootProductUri, quantity }),
        types: [
            {
                type: actionTypes.REQUEST_SET_ROOT_PRODUCT,
                payload: { rootProductUri, quantity }
            },
            {
                type: actionTypes.RECEIVE_SET_ROOT_PRODUCT,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Root Product - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});

export const updateDemListDetails = (lastReviewedOn, retailerUri) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}${retailerUri}/dem-stock`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        },
        body: JSON.stringify({ updatedDate: lastReviewedOn }),
        types: [
            {
                type: actionTypes.REQUEST_UPDATE_DEM_LIST_DETAILS,
                payload: { retailerUri }
            },
            {
                type: actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailer Dem List - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});