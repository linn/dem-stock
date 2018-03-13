export const getRootProduct = (rootProductUri, rootProducts) => {
    if (!rootProductUri || !rootProducts) {
        return null;
    }

    const rootProduct = rootProducts.find(p => p.rootProductUri === rootProductUri);

    return rootProduct && !rootProduct.loading
        ? rootProduct.item
        : null;
}

export const getRootProductName = (rootProductUri, rootProducts) => {
    var rootProduct = getRootProduct(rootProductUri, rootProducts);
    return rootProduct ? rootProduct.name : null;
}