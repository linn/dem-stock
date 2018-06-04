export const getRetailer = (retailerId, retailers) => {
    if (!retailers || !retailers.items) {
        return null;
    }

    var retailer = retailers.items.find(a => a.id === retailerId);
    return retailer ? retailer : null;
}