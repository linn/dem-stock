import { connect } from 'react-redux';
import queryString from 'query-string';
import RetailerDemListsWithoutProduct from '../components/retailerDemListsWithoutProduct';
import initialiseOnMount from './common/initialiseOnMount';
import { fetchRetailerDemLists } from '../actions/retailerDemLists';
import { fetchAllRetailers } from '../actions/retailers';

const getit = ownProps => {
    const query = ownProps.location.search ? queryString.parse(ownProps.location.search) : {productUri : null };
    return query.productUri;
}

const mapStateToProps = ({ retailerDemLists, retailers }, ownProps) => ({
    retailerDemLists,
    retailers,
    productUri: getit(ownProps)
});

const initialise = ({ productUri }) => dispatch => {
    dispatch(fetchAllRetailers());
    dispatch(fetchRetailerDemLists('lists-without-product', `?productUri=${productUri}`));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(RetailerDemListsWithoutProduct));