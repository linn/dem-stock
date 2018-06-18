import { connect } from 'react-redux';
import RetailerDemListsWithoutProductOptions from '../components/RetailerDemListsWithoutProductOptions';
import { hideRootProductSearch, setRootProductSearchTerm } from '../actions/rootProductSearch';
import { withRouter } from 'react-router'

const mapStateToProps = ({ rootProductSearch }) => ({
    rootProducts: rootProductSearch.items,
    visible: rootProductSearch.visible,
    loading: rootProductSearch.loading,
    searchTerm: rootProductSearch.searchTerm
});

const mapDispatchToProps = {
    hideRootProductSearch,
    setRootProductSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RetailerDemListsWithoutProductOptions));