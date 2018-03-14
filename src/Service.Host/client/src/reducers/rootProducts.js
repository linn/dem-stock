import * as actionTypes from '../actions';
import { distinct } from '../helpers/utilities';

const rootProducts = (state = [], action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ROOT_PRODUCTS:
            {
                const productsToAdd = action.payload.rootProductUris.filter(u => !state.some(p => p.rootProductUri === u));
                return state.concat(
                    productsToAdd.map(p => {
                        return {
                            rootProductUri: p,
                            loading: true,
                            item: null
                        };
                    }));
            }

        case actionTypes.RECEIVE_ROOT_PRODUCTS:
            {
                const rootProducts = state.filter(p => !action.payload.rootProductUris.some(url => p.rootProductUri === url));

                const deduplicatedPayload = distinct(action.payload.rootProductUris);

                const itemsToAdd = deduplicatedPayload.map(pUrl => action.payload.data.find(p => p.href === pUrl));

                return rootProducts.concat(itemsToAdd.map(p => ({
                    rootProductUri: p.href,
                    loading: false,
                    item: p
                })
                ));
            }

        default:
            return state;
    }
}

export default rootProducts;