import * as actionTypes from '../actions';
import { fetchRetailerDemList } from '../actions/retailerDemList';

export const rootProductsMiddleware = ({dispatch, getState}) => next => action => {        

    switch(action.type) {
        case actionTypes.RECEIVE_SET_ROOT_PRODUCT:
            dispatch(fetchRetailerDemList(getState().retailerDemList.retailerUri));
            break;
    }
    
    const result = next(action);

    return result;
}