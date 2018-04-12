import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemList, setRootProduct, updateDemListDetails } from '../actions/retailerDemList';
import { getRetailerDemList, getRetailerDemListRetailerUri, getRetailerDemListActivities } from '../selectors/retailerDemListSelectors';
import { getRetailerName } from '../selectors/retailerSelectors';
import { showRootProductSearch } from '../actions/rootProductSearch';

const mapStateToProps = ({ retailerDemList, retailer, rootProducts }, { match }) => ({
    retailerId: match.params.retailerId,
    retailerDemList: getRetailerDemList(retailerDemList),
    retailerUri: getRetailerDemListRetailerUri(retailerDemList),
    rootProducts: rootProducts,
    retailerName: getRetailerName(retailer),
    loading: retailerDemList.loading,
    activities: getRetailerDemListActivities(retailerDemList)
});

const initialise = ({ retailerId }) => dispatch => {
    dispatch(fetchRetailerDemList(`/retailers/${retailerId}`));
};

const mapDispatchToProps = {
    initialise,
    showRootProductSearch,
    setRootProduct,
    updateDemListDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemList));