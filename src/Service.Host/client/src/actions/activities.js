import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const fetchActivities = retailerUri => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}${retailerUri}/dem-stock/activities`,
        method: 'GET',
        options: { requiresAuth: true },
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_ACTIVITIES,
                payload: { retailerUri }
            },
            {
                type: actionTypes.RECEIVE_ACTIVITIES,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Activities - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});