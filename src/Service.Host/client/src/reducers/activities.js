import * as actionTypes from '../actions';

const defaultState = {
    loading: false,
    items: []
}

const activities = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ACTIVITIES:
            return {
                ...state,
                loading: true
            };

        case actionTypes.RECEIVE_ACTIVITIES:
            return {
                ...state,
                loading: false,
                items: [...action.payload.data.activities]
            };

        default:
            return state;
    }
}

export default activities;