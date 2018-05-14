import * as actionTypes from '../actions';
import { distinct } from '../helpers/utilities';

const employees = (state = [], action) => {
    switch (action.type) {
        case actionTypes.REQUEST_EMPLOYEE_NAME:            
            return [
                ...state
            ]

        case actionTypes.RECEIVE_EMPLOYEE_NAME:
            return [
                ...state,
                action.payload.data
            ]

        default:
            return state;
    }
}

export default employees;