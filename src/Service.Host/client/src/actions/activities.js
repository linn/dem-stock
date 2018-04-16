import { fetchJson } from '../helpers/fetchJson';
import config from '../config';
import * as actionTypes from './index';

const requestActivities = retailerUri => ({
    type: actionTypes.REQUEST_ACTIVITIES,
    payload: { retailerUri }
});

const receiveActivities = data => ({
    type: actionTypes.RECEIVE_ACTIVITIES,
    payload: { data }
});

export const fetchActivities = retailerUri => async dispatch => {    
    dispatch(requestActivities(retailerUri));
    try {
        const data = await fetchJson(`${config.appRoot}${retailerUri}/dem-stock/activities`);
        dispatch(receiveActivities(data));
    } catch (e) {
        alert(`Failed to fetch dem list activities. Error: ${e.message}`);
    }
};
