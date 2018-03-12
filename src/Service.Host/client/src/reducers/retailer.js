import * as actionTypes from '../actions';

const defaultState = {
    retailerUri: null,
    loading: false,
    item: null
}

const retailer = (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.REQUEST_RETAILER:
        return {
            ...state,
            item: null,
            retailerUri: action.payload.retailerUri,
            loading: true
        }

    case actionTypes.RECEIVE_RETAILER:
        return {
            ...state,
            loading: false,
            item: action.payload.data
        }

    default:
        return state;
    }

}

export default retailer;