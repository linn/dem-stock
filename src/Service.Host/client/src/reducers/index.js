import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as oidc } from 'redux-oidc';
import activities from './activities';
import retailerSearch from './retailerSearch';
import retailerDemList from './retailerDemList';
import retailerDemLists from './retailerDemLists';
import retailer from './retailer';
import retailers from './retailers';
import rootProducts from './rootProducts';
import rootProductSearch from './rootProductSearch';
import employees from './employees';

const rootReducer = combineReducers({
    oidc,
    router,
    retailerSearch,
    retailerDemList,
    retailerDemLists,
    retailer,
    retailers,
    rootProducts,
    rootProductSearch,
    activities,
    employees
});

export default rootReducer;