import * as actionTypes from '../actions';

const activities = (state = [], action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ACTIVITIES:
            return []

        case actionTypes.RECEIVE_ACTIVITIES:
            return action.payload.data.activities;

        default:
            return state;
    }
}

export default activities;