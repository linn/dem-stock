import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import activities from './activities';
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
    rootProductSearch,
    activities
});

export default rootReducer;