﻿import * as actionTypes from '../actions';

const defaultState = {
    visible: true,
    loading: false,
    searchTerm: '',
    items: []
}

const retailerSearch = (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.REQUEST_RETAILERS_SEARCH:
        return {
            ...state,
            loading: true,
            searchTerm: action.payload.searchTerm,
            items: []
        }

    case actionTypes.RECEIVE_RETAILERS_SEARCH:
        return {
            ...state,
            loading: false,
            searchTerm: action.payload.searchTerm,
            items: action.payload.data ? action.payload.data.retailers : []
        }

    case actionTypes.CLEAR_RETAILER_SEARCH:
        return {
            ...defaultState,
            visible: true
        }

    default:
        return state;
    }
}

export default retailerSearch;