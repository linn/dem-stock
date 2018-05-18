import { getRetailerDemListItem } from './utilities/retailerDemListSelectorUtilities';
import { getRootProductName } from './utilities/rootProductsSelectorsUtilities';

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
    }));
}

export const getRetailerDemListRetailerUri = ({ retailerDemList }) => {
    return getRetailerDemListItem(retailerDemList)
        ? `/retailers/${getRetailerDemListItem(retailerDemList).retailerId}`
        : null;
}

export const getRetailerDemListLoading = ({ retailerDemList, retailer, rootProducts, employees }) => {
    if (!retailerDemList || !rootProducts || !employees) {
        return null;
    }

    return retailerDemList.loading || retailer.loading || rootProducts.loading || employees.loading;
}