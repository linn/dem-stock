export const getRetailerName = (retailer) => {
    if (!retailer || !retailer.item || retailer.loading) {
        return null;
    }

    return retailer.item.name;
}