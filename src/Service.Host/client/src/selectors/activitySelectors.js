import { getRootProductName } from './utilities/rootProductsSelectorsUtilities';
import { getEmployeeName } from './utilities/employeeSelectorUtilities';

export const getActivities = ({ activities, rootProducts, employees }) => {
    if (!activities || !activities.items) {
        return null;
    }

    return activities.items;
}