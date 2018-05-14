import { getRetailerDemListItem } from './utilities/retailerDemListSelectorUtilities';

export const getRetailerDemList = ({ retailerDemList }) => {
    return getRetailerDemListItem(retailerDemList);
}

export const getRetailerDemListRetailerUri = ({ retailerDemList }) => {
    return getRetailerDemListItem(retailerDemList)
        ? `/retailers/${getRetailerDemListItem(retailerDemList).retailerId}`
        : null;
}

export const getRetailerDemListLoading = ({ retailerDemList }) => {
    if (!retailerDemList || !retailerDemList.loading) {
        return null;
    }

    return retailerDemList.loading;
}