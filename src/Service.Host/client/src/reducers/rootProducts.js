import * as actionTypes from '../actions';
import { distinct } from '../helpers/utilities';

const defaultState = {
    loading: false,
    items: []
}

const rootProducts = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ROOT_PRODUCTS:
            {
                const rootProductsToAdd = action.payload.rootProductUris.map(p => {
                    return {
                            rootProductUri: p,
                            loading: true,
                            item: null
                    }
                });

                return {
                    ...state,
                    loading: true,
                }
            }

        case actionTypes.RECEIVE_ROOT_PRODUCTS:
            {
                const rootProductsToAdd = action.payload.data.map(p => {
                    return {
                        rootProductUri: p.href,
                        loading: false,
                        item: p
                    }
                });

                return {
                    ...state,
                    loading: false,
                    items: [...state.items, ...rootProductsToAdd]
                }
            }

        default:
            return state;
    }
}

export default rootProducts;