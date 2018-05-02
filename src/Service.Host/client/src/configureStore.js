import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware as api } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import { loadUser } from 'redux-oidc';
import userManager from './helpers/userManager';
import authorization from './middleware/authorization';
import { rootProductsMiddleware, fetchErrorHandlingMiddleware } from './middleware';

export default function createStoreFunction(reducer, initialState) {

    const middleware = applyMiddleware(authorization, api, thunkMiddleware, rootProductsMiddleware, routerMiddleware(history), fetchErrorHandlingMiddleware);

    const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production'
        ? compose(
            middleware,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        : compose(
            middleware);

    const store = createStore(reducer, initialState, enhancers);

    loadUser(store, userManager);

    return store;
};