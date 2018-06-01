import * as actionTypes from '../actions';

const defaultState = {
    loading: false,
    items: []
}

const retailerDemLists = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_RETAILER_DEM_LISTS:
            return {
                ...state,
                loading: true
            }

        case actionTypes.RECEIVE_RETAILER_DEM_LISTS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            }

        default:
            return state;
    }
}

export default retailerDemLists;