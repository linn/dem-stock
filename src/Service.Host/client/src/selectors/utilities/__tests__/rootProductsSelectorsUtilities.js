import { getRootProduct, getRootProductName, getRootProductsLoading, getRootProductsUpdating, getRootProductUris } from '../rootProductsSelectorsUtilities';

describe('when selecting a root product', () => {
    test('should return root product', () => {

        const rootProductUri = '/products/root-products/12345';

        const rootProducts = {
            loading: false,
            items: [
                {
                    rootProductUri: "/products/root-products/12345",
                    loading: false,
                    item: {
                        name: 'MAJIK DS/2',
                        href: '/products/root-products/12345'
                    }
                },
                {
                    rootProductUri: "/products/root-products/67890",
                    loading: false,
                    item: {
                        name: 'KLIMAX DSM/3',
                        href: '/products/root-products/67890'
                    }
                }
            ]
        };

        const expectedRootProduct = {
            name: 'MAJIK DS/2',
            href: '/products/root-products/12345'
        };

        expect(getRootProduct(rootProductUri, rootProducts)).toEqual(expectedRootProduct);
    });

    test('should return null when no match', () => {

        const rootProductUri = '/products/root-products/54321';

        const rootProducts = {
            loading: false,
            items: [
                {
                    rootProductUri: "/products/root-products/12345",
                    loading: false,
                    item: {
                        name: 'MAJIK DS/2',
                        href: '/products/root-products/12345'
                    }
                },
                {
                    rootProductUri: "/products/root-products/67890",
                    loading: false,
                    item: {
                        name: 'KLIMAX DSM/3',
                        href: '/products/root-products/67890'
                    }
                }
            ]
        };

        expect(getRootProduct(rootProductUri, rootProducts)).toEqual(null);
    });

    test('should return null when loading', () => {

        const rootProductUri = '/products/root-products/12345';

        const rootProducts = [
            {
                rootProductUri: "/products/root-products/12345",
                loading: true,
                item: null
            },
            {
                rootProductUri: "/products/root-products/67890",
                loading: false,
                item: {
                    name: 'KLIMAX DSM/3',
                    href: '/products/root-products/67890'
                }
            }
        ];

        expect(getRootProduct(rootProductUri, rootProducts)).toEqual(null);
    });
});

describe('when selecting a root product name', () => {
    test('should return name', () => {

        const rootProductUri = '/products/root-products/12345';

        const rootProducts = {
            loading: false,
            items: [
                {
                    rootProductUri: "/products/root-products/12345",
                    loading: false,
                    item: {
                        name: 'MAJIK DS/2',
                        href: '/products/root-products/12345'
                    }
                },
                {
                    rootProductUri: "/products/root-products/67890",
                    loading: false,
                    item: {
                        name: 'KLIMAX DSM/3',
                        href: '/products/root-products/67890'
                    }
                }
            ]
        };

        const expectedRootProductName = 'MAJIK DS/2';

        expect(getRootProductName(rootProductUri, rootProducts)).toEqual(expectedRootProductName);
    });

    test('should return null when no match', () => {

        const rootProductUri = '/products/root-products/54321';

        const rootProducts = {
            loading: false,
            items: [
                {
                    rootProductUri: "/products/root-products/12345",
                    loading: false,
                    item: {
                        name: 'MAJIK DS/2',
                        href: '/products/root-products/12345'
                    }
                },
                {
                    rootProductUri: "/products/root-products/67890",
                    loading: false,
                    item: {
                        name: 'KLIMAX DSM/3',
                        href: '/products/root-products/67890'
                    }
                }
            ]
        };

        expect(getRootProductName(rootProductUri, rootProducts)).toEqual(null);
    });
});

describe('when selecting root products loading', () => {
    test('should return true not loaded and loading', () => {
        const rootProducts = {
            loaded: false,
            loading: true,
            items: []
        }

        expect(getRootProductsLoading(rootProducts)).toEqual(true);
    });

    test('should return false not loaded and not loading', () => {
        const rootProducts = {
            loaded: false,
            loading: false,
            items: []
        }

        expect(getRootProductsLoading(rootProducts)).toEqual(false);
    });

    test('should return false when loaded and loading', () => {
        const rootProducts = {
            loaded: true,
            loading: true,
            items: []
        }

        expect(getRootProductsLoading(rootProducts)).toEqual(false);
    });

    test('should return false when not loaded and not loading', () => {
        const rootProducts = {
            loaded: false,
            loading: false,
            items: []
        }

        expect(getRootProductsLoading(rootProducts)).toEqual(false);
    });
});

describe('when selecting root products updating', () => {
    test('should return false when not loaded and loading', () => {
        const rootProducts = {
            loaded: false,
            loading: true,
            items: []
        }

        expect(getRootProductsUpdating(rootProducts)).toEqual(false);
    });

    test('should return true when loaded and loading', () => {
        const rootProducts = {
            loaded: true,
            loading: true,
            items: []
        }

        expect(getRootProductsUpdating(rootProducts)).toEqual(true);
    });

    test('should return false when loaded and not loading', () => {
        const rootProducts = {
            loaded: true,
            loading: false,
            items: []
        }

        expect(getRootProductsUpdating(rootProducts)).toEqual(false);
    });

    test('should return false when not loaded and not loading', () => {
        const rootProducts = {
            loaded: false,
            loading: false,
            items: []
        }

        expect(getRootProductsUpdating(rootProducts)).toEqual(false);
    });
});

describe('when selecting root product uris', () => {

    test('should return root product uris', () => {

        const rootProducts = {
            loading: false,
            items: [
                {
                    rootProductUri: "/products/root-products/12345",
                    loading: false,
                    item: {
                        name: 'MAJIK DS/2',
                        href: '/products/root-products/12345'
                    }
                },
                {
                    rootProductUri: "/products/root-products/67890",
                    loading: false,
                    item: {
                        name: 'KLIMAX DSM/3',
                        href: '/products/root-products/67890'
                    }
                }
            ]
        };

        const expected = ['/products/root-products/12345', '/products/root-products/67890'];

        expect(getRootProductUris(rootProducts)).toEqual(expected);
    });
});
