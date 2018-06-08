import * as actionTypes from '../actions';
import { fetchRetailerDemList } from '../actions/retailerDemList';

export const rootProductsMiddleware = ({dispatch, getState}) => next => action => {        

    if (action.type === actionTypes.RECEIVE_SET_ROOT_PRODUCT) {
        dispatch(fetchRetailerDemList(getState().retailerDemList.retailerUri));
    }
    
    const result = next(action);

    return result;
}