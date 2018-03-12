import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemList } from '../actions/retailerDemList';
import { fetchRetailer } from '../actions/retailer';
import { getRetailerDemList, getRetailerDemListRetailerUri } from '../selectors/retailerDemListSelectors';
import { getRetailerName } from '../selectors/retailerSelectors';

const mapStateToProps = ({ retailerDemList, retailer }, { match }) => ({
    retailerDemListUri: match.url,
    retailerDemList: getRetailerDemList(retailerDemList),
    retailerDemListRetailerUri: getRetailerDemListRetailerUri(retailerDemList),
    retailerName: getRetailerName(retailer),
    loading: retailerDemList.loading
});

const initialise = ({ retailerDemListUri }) => dispatch => {
    dispatch(fetchRetailerDemList(retailerDemListUri));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemList));