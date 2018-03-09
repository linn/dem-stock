import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import retailerSearch from './retailerSearch';

const rootReducer = combineReducers({
    router,
    retailerSearch
});

export default rootReducer;