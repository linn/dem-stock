import { connect } from 'react-redux';
import RetailerDemList from '../components/RetailerDemList';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemList } from '../actions/retailerDemList';
import { getRetailerDemList } from '../selectors/retailerDemListSelectors';

const mapStateToProps = ({ retailerDemList }, { match }) => ({
    retailerDemListUri: match.url,
    retailerDemList: getRetailerDemList(retailerDemList),
    loading: retailerDemList.loading
});

const initialise = ({ retailerDemListUri, retailerDemList }) => dispatch => {
    dispatch(fetchRetailerDemList(retailerDemListUri));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemList));