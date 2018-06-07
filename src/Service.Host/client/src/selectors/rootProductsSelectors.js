import { getActivityRootProductUris } from './utilities/activitySelectorUtilities';
import { getRetailerDemListRootProductUris } from './utilities/retailerDemListSelectorUtilities';
import { getRootProductUris } from './utilities/rootProductsSelectorsUtilities';
import { distinct } from '../helpers/utilities';

export const getRootProductsToFetch = ({ retailerDemList, rootProducts }, activities) => {
    const urisToFetch = distinct(activities.map(a => a.rootProductUri).concat(getRetailerDemListRootProductUris(retailerDemList))).filter(n => n != undefined);
    
    if (!rootProducts.items.length) {
        return urisToFetch;
    }

    return urisToFetch.filter(r => !getRootProductUris(rootProducts).some(s => s === r));
}

export const getRootProducts = ({ rootProducts }) => {
    if (!rootProducts.items) {
        return null;
    }
    
    return rootProducts.items.filter(r => r.item);
}