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
    const rootProduct = getRootProduct(rootProductUri, rootProducts);
    return rootProduct ? rootProduct.name : null;
}

export const getRootProductUris = (rootProducts) => {
    if (!rootProducts) {
        return null;
    }
    
    return rootProducts.map(r => r.rootProductUri);
}