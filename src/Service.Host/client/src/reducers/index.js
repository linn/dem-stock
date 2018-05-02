import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as oidc } from 'redux-oidc';
import activities from './activities';
import retailerSearch from './retailerSearch';
import retailerDemList from './retailerDemList';
import retailer from './retailer';
import rootProducts from './rootProducts';
import rootProductSearch from './rootProductSearch';

const rootReducer = combineReducers({
    oidc,
    router,
    retailerSearch,
    retailerDemList,
    retailer,
    rootProducts,
    rootProductSearch,
    activities
});

export default rootReducer;