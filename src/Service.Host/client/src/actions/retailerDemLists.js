import { fetchJson, putJson } from '../helpers/fetchJson';
import { getSelfHref } from '../helpers/utilities';
import config from '../config';
import * as actionTypes from './index';
import { fetchRetailer } from './retailer';
import { CALL_API } from 'redux-api-middleware';

export const fetchRetailerDemLists = (reportRoute, queryString) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/retailers/dem-stock/${reportRoute}${queryString ? queryString : ''}`,
        method: 'GET',
        options: { requiresAuth: true },
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_RETAILER_DEM_LISTS,
                payload: {}
            },
            {
                type: actionTypes.RECEIVE_RETAILER_DEM_LISTS,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailer Dem Lists - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

