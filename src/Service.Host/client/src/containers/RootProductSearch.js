import { connect } from 'react-redux';
import RootProductSearch from '../components/RootProductSearch';
import { hideRootProductSearch, setRootProductSearchTerm } from '../actions/rootProductSearch';

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

export default connect(mapStateToProps, mapDispatchToProps)(RootProductSearch);