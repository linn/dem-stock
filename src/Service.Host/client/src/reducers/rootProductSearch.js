import * as actionTypes from '../actions';
import { compareArrays } from '../helpers/utilities';

const defaultState = {
    visible: false,
    loading: false,
    searchTerm: '',
    includePhasedOut: false,
    items: []
}

const rootProductSearch = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_SEARCH_ROOT_PRODUCTS:
            return {
                ...state,
                loading: true,
                items: []
            };

        case actionTypes.RECEIVE_SEARCH_ROOT_PRODUCTS:
            return (state.searchTerm === action.payload.searchTerm)
                ? {
                    ...state,
                    loading: false,
                    items: action.payload.rootProducts
                }
                : state;

        case actionTypes.CLEAR_SEARCH_ROOT_PRODUCTS:
            return {
                ...state,
                loading: false,
                items: []
            };

        case actionTypes.SET_ROOT_PRODUCT_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload
            };

        case actionTypes.TOGGLE_INCLUDE_PHASED_OUT:
            return {
                ...state,
                includePhasedOut: action.payload
            };

        case actionTypes.SHOW_ROOT_PRODUCT_SEARCH:
            return {
                ...defaultState,
                visible: true
            };

        case actionTypes.HIDE_ROOT_PRODUCT_SEARCH:
            return {
                ...defaultState
            };

        default:
            return state;
    }
}

export default rootProductSearch;