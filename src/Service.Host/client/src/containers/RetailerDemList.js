import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { setRootProduct, updateDemListDetails, fetchRetailerDemListDetails } from '../actions/retailerDemList';
import { getRetailerDemList, getRetailerDemListRetailerUri } from '../selectors/retailerDemListSelectors';
import { getRetailerName } from '../selectors/retailerSelectors';
import { getActivities } from '../selectors/activitySelectors';
import { showRootProductSearch } from '../actions/rootProductSearch';
import { getEmployeeName } from '../selectors/oidcSelectors';

const mapStateToProps = ({ retailerDemList, retailer, rootProducts, activities, oidc }, { match }) => ({
    retailerId: match.params.retailerId,
    retailerDemList: getRetailerDemList(retailerDemList),
    retailerUri: getRetailerDemListRetailerUri(retailerDemList),
    rootProducts: rootProducts,
    retailerName: getRetailerName(retailer),
    loading: retailerDemList.loading,
    activities: getActivities(activities, rootProducts),
    employeeName: getEmployeeName(oidc)
});

const initialise = ({ retailerId }) => dispatch => {
    dispatch(fetchRetailerDemListDetails(`/retailers/${retailerId}`));
};

const mapDispatchToProps = {
    initialise,
    showRootProductSearch,
    setRootProduct,
    updateDemListDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemList));