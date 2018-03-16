export const getRetailerName = (retailer) => {
    if (!retailer || !retailer.item ) {
        return null;
    }

    return retailer.item.name;
}