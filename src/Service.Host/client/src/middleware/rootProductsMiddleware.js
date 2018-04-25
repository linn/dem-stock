import * as actionTypes from '../actions';
import { fetchRootProducts } from '../actions/rootProducts';
import { getActivities, getActivityRootProductUris } from '../selectors/activitySelectors';
import { getRetailerDemListRootProductUris } from '../selectors/retailerDemListSelectors';
import { getRootProductsToFetch } from '../selectors/rootProductsSelectors';

export const rootProductsMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);

    switch(action.type) {
        case actionTypes.RECEIVE_ACTIVITIES:
            const rootProductsToFetch = getRootProductsToFetch(getState(), action.payload);
            rootProductsToFetch.length && dispatch(fetchRootProducts(rootProductsToFetch));
    }

    return result;
}