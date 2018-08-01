import { connect } from 'react-redux';
import RootProductSearch from '../components/RootProductSearch';
import { hideRootProductSearch, setRootProductSearchTerm, setIncludePhasedOut } from '../actions/rootProductSearch';

const mapStateToProps = ({ rootProductSearch }) => ({
    rootProducts: rootProductSearch.items,
    visible: rootProductSearch.visible,
    loading: rootProductSearch.loading,
    searchTerm: rootProductSearch.searchTerm,
    includePhasedOut: rootProductSearch.includePhasedOut
});

const mapDispatchToProps = {
    hideRootProductSearch,
    setRootProductSearchTerm,
    setIncludePhasedOut
};

export default connect(mapStateToProps, mapDispatchToProps)(RootProductSearch);