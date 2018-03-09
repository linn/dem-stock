import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import retailerSearch from './retailerSearch';
import retailerDemList from './retailerDemList';

const rootReducer = combineReducers({
    router,
    retailerSearch,
    retailerDemList
});

export default rootReducer;