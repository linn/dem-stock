import { getRootProductName } from './utilities/rootProductsSelectorsUtilities';
import { getEmployeeName } from './utilities/employeeSelectorUtilities';

export const getActivities = ({ activities, rootProducts, employees }) => {
    if (!activities || !rootProducts || !employees) {
        return null;
    }

    return activities.items.map(activity => ({
        ...activity,
        rootProductName: getRootProductName(activity.rootProductUri, rootProducts),
        updatedByName: getEmployeeName(activity.updatedByUri, employees)
    }));
}