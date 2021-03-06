﻿import config from '../config';
import * as actionTypes from './index';
import { CALL_API } from 'redux-api-middleware';

export const fetchEmployeeName = employeeUri => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}${employeeUri}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_EMPLOYEE_NAME,
                payload: { 'employeeUri': employeeUri }
            },
            {
                type: actionTypes.RECEIVE_EMPLOYEE_NAME,
                payload: async (action, state, res) => ({ data: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Employee - ${res.status} ${res.statusText}` : `Network request failed`,
            }
        ]
    }
});