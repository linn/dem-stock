import { connect } from 'react-redux';
import retailerDemListsWithoutProduct from '../components/retailerDemListsWithoutProduct';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemLists } from '../actions/retailerDemLists';
import { fetchAllRetailers } from '../actions/retailers';

const mapStateToProps = ({ retailerDemLists, retailers }, { match }) => ({
    retailerDemLists,
    retailers,
    productUri : match.params.productUri
});

const initialise = () => dispatch => {
    dispatch(fetchAllRetailers());
    dispatch(fetchRetailerDemLists('lists-without-product', `?productUri=/products/root-products/1661`));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(retailerDemListsWithoutProduct));