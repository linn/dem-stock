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