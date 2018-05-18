import * as actionTypes from '../actions';

const defaultState = {
    loading: false,
    items: []
}

const activities = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ACTIVITIES:
            return {
                loading: true,
                items: []
            };

        case actionTypes.RECEIVE_ACTIVITIES:
            return {
                loading: false,
                items: [...action.payload.data.activities]
            };

        default:
            return state;
    }
}

export default activities;