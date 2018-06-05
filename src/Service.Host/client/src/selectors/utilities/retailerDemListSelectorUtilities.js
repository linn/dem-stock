export const getRetailerDemListItem = retailerDemList => {
    if (!retailerDemList || !retailerDemList.item) {
        return null;
    }

    return retailerDemList.item;
}

export const getRetailerDemListRootProductUris = retailerDemList => {
    return getRetailerDemListItem(retailerDemList)
        ? getRetailerDemListItem(retailerDemList).rootProducts.map(rp => rp.rootProductUri)
        : null;
}

export const getDemListUpdating = retailerDemList => {
    if (!retailerDemList.item) {
        return null;
    }
    return Object.keys(retailerDemList.item).length !== 0 && retailerDemList.loading;
}