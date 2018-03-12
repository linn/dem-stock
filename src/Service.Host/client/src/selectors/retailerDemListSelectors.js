export const getRetailerDemList = (retailerDemList) => {
    if (!retailerDemList || !retailerDemList.item) {
        return null;
    }

    return retailerDemList.item;
}

export const getRetailerDemListRetailerUri = (retailerDemList) => {
    return getRetailerDemList(retailerDemList) ? getRetailerDemList(retailerDemList).retailerUri : null;
}