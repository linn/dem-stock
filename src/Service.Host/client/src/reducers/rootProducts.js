import * as actionTypes from '../actions';
import { distinct } from '../helpers/utilities';

const defaultState = {
    loaded: false,
    loading: false,
    items: []
}

const rootProducts = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ROOT_PRODUCTS:
            {
                const rootProductsToAdd = action.payload.rootProductUris.map(p => ({
                    rootProductUri: p,
                    loading: true,
                    item: null
                }));

                return {
                    ...state,
                    loading: true,
                    items: [...state.items, ...rootProductsToAdd]
                }
            }

        case actionTypes.RECEIVE_ROOT_PRODUCTS:
            {
                const loadedRootProducts = state.items.filter(p => !action.payload.rootProductUris.some(url => p.rootProductUri === url));

                const rootProductsToAdd = action.payload.data.map(p => ({
                    rootProductUri: p.href,
                    loading: false,
                    item: p
                }));

                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    items: [...loadedRootProducts, ...rootProductsToAdd]
                }
            }

        default:
            return state;
    }
}

export default rootProducts;