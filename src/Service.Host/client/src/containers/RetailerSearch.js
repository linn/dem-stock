import { connect } from 'react-redux';
import RetailerSearch from '../components/RetailerSearch';
import { searchRetailers, clearRetailerSearch } from '../actions/retailerSearch';
import { withRouter } from 'react-router'
import { fetchRetailerDemList } from '../actions/retailerDemList';

const mapStateToProps = ({ retailerSearch }) => ({
    retailers: retailerSearch.items,
    visible: retailerSearch.visible,
    loading: retailerSearch.loading
});

const mapDispatchToProps = {
    clearRetailerSearch,
    searchRetailers,
    fetchRetailerDemList
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RetailerSearch));