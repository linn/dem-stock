import * as actionTypes from '../actions';

const defaultState = {
    loading: false,
    items: []
}

const retailers = (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.REQUEST_RETAILERS:
        return {
            ...state,
            loading: true
        }

    case actionTypes.RECEIVE_RETAILERS:
        return {
            ...state,
            loading: false,
            items: action.payload.data.retailers
        }

    default:
        return state;
    }
}

export default retailers;