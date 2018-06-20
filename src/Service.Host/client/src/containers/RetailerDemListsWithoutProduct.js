import { connect } from 'react-redux';
import queryString from 'query-string';
import RetailerDemListsWithoutProduct from '../components/RetailerDemListsWithoutProduct';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemLists } from '../actions/retailerDemLists';
import { fetchAllRetailers } from '../actions/retailers';
import { fetchRootProducts } from '../actions/rootProducts';
import { getRootProductName } from '../selectors/rootProductsSelectors';

const getProductUri = ownProps => {
    const query = ownProps.location.search ? queryString.parse(ownProps.location.search) : {productUri : null };
    return query.productUri;
}

const mapStateToProps = (state, ownProps) => ({
    retailerDemLists : state.retailerDemLists,
    retailers: state.retailers,
    productUri: getProductUri(ownProps),
    productName: getRootProductName(state, getProductUri(ownProps))
});

const initialise = ({ productUri }) => dispatch => {
    dispatch(fetchAllRetailers());
    dispatch(fetchRetailerDemLists('lists-without-product', `?productUri=${productUri}`));
    dispatch(fetchRootProducts([productUri]));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemListsWithoutProduct));