import { getRetailerDemListItem, getDemListUpdating } from './utilities/retailerDemListSelectorUtilities';
import { getRootProductName, getRootProductsUpdating, getRootProductsLoading } from './utilities/rootProductsSelectorsUtilities';
import { getActivitiesUpdating, getActivitiesLoading } from './utilities/activitySelectorUtilities';
import { getEmployeesUpdating, getEmployeesLoading } from './utilities/employeeSelectorUtilities';

export const getRetailerDemList = ({ retailerDemList }) => {
    return getRetailerDemListItem(retailerDemList);
}

export const getRetailerDemListRootProducts = ({ retailerDemList, rootProducts }) => {
    if (!retailerDemList || !retailerDemList.item || !rootProducts) {
        return null;
    }

    return retailerDemList.item.rootProducts.map(rootProduct => ({
        ...rootProduct,
        name: getRootProductName(rootProduct.rootProductUri, rootProducts)
    })).filter(r => r.name);
}

export const getRetailerDemListRetailerUri = ({ retailerDemList }) => {
    return getRetailerDemListItem(retailerDemList)
        ? `/retailers/${getRetailerDemListItem(retailerDemList).retailerId}`
        : null;
}

export const getRetailerDemListLoading = ({ retailerDemList, retailer, rootProducts, employees, activities }) => {
    return retailerDemList.loading || retailer.loading || getRootProductsLoading(rootProducts) || getEmployeesLoading(employees) || getActivitiesLoading(activities);
}

export const getRetailerDemListUpdating = ({ retailerDemList, rootProducts, activities }) => {
    return (getDemListUpdating(retailerDemList) || getRootProductsUpdating(rootProducts) || getActivitiesUpdating(activities));
}