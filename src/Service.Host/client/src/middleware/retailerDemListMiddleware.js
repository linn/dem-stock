import * as actionTypes from '../actions';
import { getHref } from '../helpers/utilities';
import { fetchRetailerDemList } from '../actions/retailerDemList';
import { fetchActivities } from '../actions/activities';

export const retailerDemListMiddleware = ({dispatch, getState}) => next => action => {

    switch(action.type) {
        case actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS:
            dispatch(fetchRetailerDemList(getHref(action.payload.data, 'retailer')));
            break;

        case actionTypes.RECEIVE_RETAILER_DEM_LIST:
            dispatch(fetchActivities(getHref(action.payload.data, 'retailer')));
            break;
    }

    const result = next(action);

    return result;
}