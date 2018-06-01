import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const fetchAllRetailers = () => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}/retailers`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_RETAILERS,
                payload: {}
            },
            {
                type: actionTypes.RECEIVE_RETAILERS,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Retailers - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});