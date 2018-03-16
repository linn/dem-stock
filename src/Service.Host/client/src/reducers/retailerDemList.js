import * as actionTypes from '../actions';

const defaultState = {
    retailerUri: null,
    loading: false,
    item: null
}

const retailerDemList = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_RETAILER_DEM_LIST:
        case actionTypes.REQUEST_UPDATE_DEM_LIST_DETAILS:
            return {
                ...state,
                retailerUri: action.payload.retailerUri,
                loading: true
            }

        case actionTypes.RECEIVE_RETAILER_DEM_LIST:
        case actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS:
            return {
                ...state,
                loading: false,
                item: action.payload.data
            }

        default:
            return state;
    }
}

export default retailerDemList;