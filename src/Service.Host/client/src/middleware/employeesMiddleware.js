import * as actionTypes from '../actions';
import { getEmployeesToFetch } from '../selectors/employeeSelectors';
import { fetchEmployeeName } from '../actions/employees';

export const employeesMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);

    switch(action.type) {
        case actionTypes.RECEIVE_ACTIVITIES:
            const employeesToFetch = getEmployeesToFetch(getState(), action.payload);
            employeesToFetch.length && employeesToFetch.map(e => dispatch(fetchEmployeeName(e)));
            break;
    }

    return result;
}