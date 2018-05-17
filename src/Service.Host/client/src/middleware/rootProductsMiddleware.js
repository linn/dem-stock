import * as actionTypes from '../actions';
import { fetchRootProducts } from '../actions/rootProducts';
import { fetchRetailerDemList } from '../actions/retailerDemList';
import { fetchActivities } from '../actions/activities';
import { getRootProductsToFetch } from '../selectors/rootProductsSelectors';

export const rootProductsMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);

    switch(action.type) {
        case actionTypes.RECEIVE_ACTIVITIES:
            const rootProductsToFetch = getRootProductsToFetch(getState(), action.payload);            
            rootProductsToFetch.length && dispatch(fetchRootProducts(rootProductsToFetch));
            break;

        case actionTypes.RECEIVE_RETAILER_DEM_LIST:
            dispatch(fetchActivities(getState().retailerDemList.retailerUri));
            break;

        case actionTypes.RECEIVE_SET_ROOT_PRODUCT:
            dispatch(fetchRetailerDemList(getState().retailerDemList.retailerUri));
            break;
    }

    return result;
}