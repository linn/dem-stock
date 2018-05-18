export const getRootProduct = (rootProductUri, rootProducts) => {
    if (!rootProductUri || !rootProducts || !rootProducts.items) {
        return null;
    }

    const rootProduct = rootProducts.items.find(p => p.rootProductUri === rootProductUri);

    return rootProduct && !rootProduct.loading
        ? rootProduct.item
        : null;
}

export const getRootProductName = (rootProductUri, rootProducts) => {
    const rootProduct = getRootProduct(rootProductUri, rootProducts);
    return rootProduct ? rootProduct.name : null;
}

export const getRootProductUris = (rootProducts) => {
    if (!rootProducts || !rootProducts.items) {
        return null;
    }
    
    return rootProducts.items.map(r => r.rootProductUri);
}