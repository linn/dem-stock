import * as actionTypes from '../actions';

const defaultState = {
    retailerDemListUri: null,
    loading: false,
    item: null
}

const retailerDemList = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_RETAILER_DEM_LIST:
            return {
                ...state,
                item: null,
                retailerDemListUri: action.payload.retailerDemListUri,
                loading: true
            }

        case actionTypes.RECEIVE_RETAILER_DEM_LIST:
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