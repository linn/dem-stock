import * as actionTypes from '../actions';
import { getEmployeesToFetch } from '../selectors/employeeSelectors';
import { getRootProductsToFetch } from '../selectors/rootProductsSelectors';
import { fetchEmployeeName, fetchEmployees } from '../actions/employees';
import { fetchRootProducts } from '../actions/rootProducts';

export const activitiesMiddleware = ({dispatch, getState}) => next => action => {
    
    switch(action.type) {
        case actionTypes.RECEIVE_ACTIVITIES:
            const rootProductsToFetch = getRootProductsToFetch(getState(), action.payload.data.activities);
            dispatch(fetchRootProducts(rootProductsToFetch));

            const employeesToFetch = getEmployeesToFetch(getState(), action.payload.data.activities);
            employeesToFetch.length && employeesToFetch.map(e => dispatch(fetchEmployeeName(e)));
            break;
    }

    const result = next(action);

    return result;
}