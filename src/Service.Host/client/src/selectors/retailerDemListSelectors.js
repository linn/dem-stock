export const getRetailerDemList = (retailerDemList) => {
    if (!retailerDemList || !retailerDemList.item) {
        return null;
    }

    return retailerDemList.item;
}

export const getRetailerDemListRetailerUri = (retailerDemList) => {
    return getRetailerDemList(retailerDemList) ? `/retailers/${getRetailerDemList(retailerDemList).retailerId}` : null;
}

export const getRetailerDemListRootProductUris = (retailerDemList) => {
    if (!retailerDemList || !retailerDemList.item || !retailerDemList.item.rootProducts) {
        return null;
    }

    return retailerDemList.item.rootProducts.map(rp => rp.rootProductUri);
}