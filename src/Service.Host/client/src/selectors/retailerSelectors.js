export const getRetailerName = ({ retailer }) => {
    if (!retailer || !retailer.item || !retailer.item.name ) {
        return null;
    }

    return retailer.item.name;
}