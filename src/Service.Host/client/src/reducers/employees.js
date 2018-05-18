import * as actionTypes from '../actions';
import { distinct } from '../helpers/utilities';

const defaultState = {
    loading: false,
    items: []
}

const employees = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_EMPLOYEE_NAME:
            return {
                ...state,
                loading: true
            }

        case actionTypes.RECEIVE_EMPLOYEE_NAME:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload.data]
            }

        default:
            return state;
    }
}

export default employees;