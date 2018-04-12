export const getRetailerDemList = (retailerDemList) => {
    if (!retailerDemList || !retailerDemList.item) {
        return null;
    }

    return retailerDemList.item;
}

export const getRetailerDemListRetailerUri = (retailerDemList) => {
    return getRetailerDemList(retailerDemList) ? `/retailers/${getRetailerDemList(retailerDemList).retailerId}` : null;
}

export const getRetailerDemListActivities = (retailerDemList) => {
    if (!retailerDemList || !retailerDemList.item || !retailerDemList.item.activities) {
        return null;
    }

    return retailerDemList.item.activities;
}