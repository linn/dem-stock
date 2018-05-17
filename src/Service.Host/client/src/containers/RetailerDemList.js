import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { setRootProduct, updateDemListDetails, fetchRetailerDemListDetails } from '../actions/retailerDemList';
import { getRetailerDemList, getRetailerDemListRetailerUri, getRetailerDemListLoading, getRetailerDemListRootProducts } from '../selectors/retailerDemListSelectors';
import { getRetailerName } from '../selectors/retailerSelectors';
import { getActivities } from '../selectors/activitySelectors';
import { showRootProductSearch } from '../actions/rootProductSearch';
import { getRootProducts } from '../selectors/rootProductsSelectors';

const mapStateToProps = (state, { match }) => ({
    retailerId: match.params.retailerId,
    retailerDemList: getRetailerDemList(state),
    retailerDemListRootProducts: getRetailerDemListRootProducts(state),
    retailerUri: getRetailerDemListRetailerUri(state),
    rootProducts: getRootProducts(state),
    retailerName: getRetailerName(state),
    loading: getRetailerDemListLoading(state),
    activities: getActivities(state)
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