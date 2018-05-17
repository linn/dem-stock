import * as actionTypes from '../actions';

export const fetchErrorHandlingMiddleware = ({ dispatch, getState }) => next => action => {
    const result = next(action);

    switch (action.type) {
        case actionTypes.FETCH_ERROR:
            alert(`Failed to fetch ${action.payload}`);
            break;
    }

    return result;
}