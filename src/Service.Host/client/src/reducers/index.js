import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import retailerSearch from './retailerSearch';
import retailerDemList from './retailerDemList';
import retailer from './retailer';
import rootProducts from './rootProducts';
import rootProductSearch from './rootProductSearch';

const rootReducer = combineReducers({
    router,
    retailerSearch,
    retailerDemList,
    retailer,
    rootProducts,
    rootProductSearch
});

export default rootReducer;