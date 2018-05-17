import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const fetchRetailer = retailerUri => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}${retailerUri}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_RETAILER,
                payload: { retailerUri }
            },
            {
                type: actionTypes.RECEIVE_RETAILER,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailer - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});