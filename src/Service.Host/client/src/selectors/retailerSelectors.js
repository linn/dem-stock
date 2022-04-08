export const getRetailerName = ({ retailer }) => {
    if (!retailer || !retailer.item || !retailer.item.name ) {
        return null;
    }

    return retailer.item.name;
}

export const getRetailerAddress = ({ retailer }) => {
    if (!retailer || !retailer.item || !retailer.item.address ) {
        return null;
    }

    return `${retailer.item.address.line1} ${retailer.item.address.line2} ${retailer.item.address.line3} ${retailer.item.address.line4}`;
}