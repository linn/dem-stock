import { getActivityRootProductUris } from './utilities/activitySelectorUtilities';
import { getRetailerDemListRootProductUris } from './utilities/retailerDemListSelectorUtilities';
import { getRootProductUris } from './utilities/rootProductsSelectorsUtilities';
import { distinct } from '../helpers/utilities';

export const getRootProductsToFetch = ({ activities, retailerDemList, rootProducts }) => {    
    const urisToFetch = distinct(getActivityRootProductUris(activities).concat(getRetailerDemListRootProductUris(retailerDemList))).filter(n => n != undefined);

    if (!rootProducts) {
        return urisToFetch;
    }

    return urisToFetch.filter(r => !getRootProductUris(rootProducts).some(s => s === r));
}

export const getRootProducts = ({ rootProducts }) => {
    if (!rootProducts) {
        return null;
    }

    return rootProducts;
}