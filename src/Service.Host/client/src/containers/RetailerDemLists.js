import { connect } from 'react-redux';
import RetailerDemLists from '../components/RetailerDemLists';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemLists } from '../actions/retailerDemLists';
import { fetchAllRetailers } from '../actions/retailers';

const mapStateToProps = ({ retailerDemLists, retailers }) => ({
    retailerDemLists,
    retailers
});

const initialise = () => dispatch => {
    dispatch(fetchAllRetailers());
    dispatch(fetchRetailerDemLists('last-reviewed'));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemLists));