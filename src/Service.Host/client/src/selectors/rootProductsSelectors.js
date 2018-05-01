import { getActivityRootProductUris } from './activitySelectors';
import { getRetailerDemListRootProductUris } from './retailerDemListSelectors';
import { distinct } from '../helpers/utilities';

export const getRootProduct = (rootProductUri, rootProducts) => {
    if (!rootProductUri || !rootProducts) {
        return null;
    }

    const rootProduct = rootProducts.find(p => p.rootProductUri === rootProductUri);

    return rootProduct && !rootProduct.loading
        ? rootProduct.item
        : null;
}

export const getRootProductName = (rootProductUri, rootProducts) => {
    var rootProduct = getRootProduct(rootProductUri, rootProducts);
    return rootProduct ? rootProduct.name : null;
}

export const getRootProductUris = (rootProducts) => {
    if (!rootProducts) {
        return null;
    }
    
    return rootProducts.map(r => r.rootProductUri);
}

export const getRootProductsToFetch = (state) => {
    const urisToFetch = distinct(getActivityRootProductUris(state.activities).concat(getRetailerDemListRootProductUris(state.retailerDemList)));

    if (!state.rootProducts) {
        return urisToFetch;
    }

    return urisToFetch.filter(r => !getRootProductUris(state.rootProducts).some(s => s === r));
}