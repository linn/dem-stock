﻿import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware as api } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import reducer from './reducers';
import authorization from './middleware/authorization';
import { rootProductsMiddleware, fetchErrorHandlingMiddleware } from './middleware';

const composeEnhancers =
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = [
    authorization,
    api,
    thunkMiddleware,
    rootProductsMiddleware,
    routerMiddleware(history),
    fetchErrorHandlingMiddleware
];


const configureStore = initialState => {
    const enhancers = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(reducer, initialState, enhancers);

    return store;
};

export default configureStore;