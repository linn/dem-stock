import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const fetchRootProducts = (rootProductUris = []) => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}/products/batch-get`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            urls: rootProductUris,
            includePhasedOut: true,
            retrieveChildren: false
        }),
        types: [
            {
                type: actionTypes.REQUEST_ROOT_PRODUCTS,
                payload: { rootProductUris }
            },
            {
                type: actionTypes.RECEIVE_ROOT_PRODUCTS,
                payload: async (action, state, res) => ({ rootProductUris, data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Root Products - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});

