import { connect } from 'react-redux';
import RetailerSearch from '../components/RetailerSearch';
import { searchRetailers, clearRetailerSearch } from '../actions/retailerSearch';
import { withRouter } from 'react-router'

const mapStateToProps = ({ retailerSearch }) => ({
    retailers: retailerSearch.items,
    visible: retailerSearch.visible,
    loading: retailerSearch.loading
});

const mapDispatchToProps = {
    clearRetailerSearch,
    searchRetailers
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RetailerSearch));