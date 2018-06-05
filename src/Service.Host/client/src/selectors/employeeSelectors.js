import { getActivityEmployeeUris } from './utilities/activitySelectorUtilities';
import { distinct } from '../helpers/utilities';
import { getEmployeeUris } from './utilities/employeeSelectorUtilities';

export const getEmployeesToFetch = ({ employees }, activities) => {
    const urisToFetch = distinct(getActivityEmployeeUris(activities));

    if (!employees.items.length) {
        return urisToFetch;
    }

    return urisToFetch.filter(a => !getEmployeeUris(employees).some(e => e === a));
}