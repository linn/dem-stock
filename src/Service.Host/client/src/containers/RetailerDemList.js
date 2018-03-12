import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemList } from '../actions/retailerDemList';
import { getRetailerDemList, getRetailerDemListRetailerUri } from '../selectors/retailerDemListSelectors';
import { getRetailerName } from '../selectors/retailerSelectors';

const mapStateToProps = ({ retailerDemList, retailer }, { match }) => ({
    retailerId: match.params.retailerId,
    retailerDemList: getRetailerDemList(retailerDemList),
    retailerName: getRetailerName(retailer),
    loading: retailerDemList.loading
});

const initialise = ({ retailerId }) => dispatch => {
    dispatch(fetchRetailerDemList(`/retailers/${retailerId}`));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemList));