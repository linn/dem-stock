import { getActivityEmployeeUris } from './utilities/activitySelectorUtilities';
import { distinct } from '../helpers/utilities';
import { getEmployeeUris } from './utilities/employeeSelectorUtilities';

export const getEmployeesToFetch = ({ activities, employees }) => {
    const urisToFetch = distinct(getActivityEmployeeUris(activities));

    if (!employees) {
        return urisToFetch;
    }

    return urisToFetch.filter(a => !getEmployeeUris(employees).some(e => e === a));
}