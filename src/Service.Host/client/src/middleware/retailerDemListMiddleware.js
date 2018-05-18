import * as actionTypes from '../actions';
import { fetchRetailerDemList } from '../actions/retailerDemList';

export const retailerDemListMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);

    switch(action.type) {        
        case actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS:
            dispatch(fetchRetailerDemList(getState().retailerDemList.retailerUri));
            break;
    }

    return result;
}