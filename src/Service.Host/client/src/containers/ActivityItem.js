import ActivityItem from '../components/ActivityItem';
import { getEmployeeName } from '../selectors/utilities/employeeSelectorUtilities';
import { getRootProductName } from '../selectors/utilities/rootProductsSelectorsUtilities';
import { connect } from 'react-redux';

const mapStateToProps = ({ employees, rootProducts }, props) => ({
    activity: props.activity,
    updatedByName: getEmployeeName(props.activity.updatedByUri, employees),
    rootProductName: getRootProductName(props.activity.rootProductUri, rootProducts)
});

export default connect(mapStateToProps)(ActivityItem);