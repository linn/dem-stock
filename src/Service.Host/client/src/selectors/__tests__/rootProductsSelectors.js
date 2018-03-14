import { getRootProduct, getRootProductName} from '../rootProductsSelectors';

describe('when selecting a root product', () => {
    test('should return root product', () => {

        const rootProductUri = '/products/root-products/12345';

        const rootProducts = [
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
        ];

        const expectedRootProduct = {
            name: 'MAJIK DS/2',
            href: '/products/root-products/12345'
        };

        expect(getRootProduct(rootProductUri, rootProducts)).toEqual(expectedRootProduct);
    });

    test('should return null when no match', () => {

        const rootProductUri = '/products/root-products/54321';

        const rootProducts = [
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
        ];

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

describe('when selecting a root product', () => {
    test('should return name', () => {

        const rootProductUri = '/products/root-products/12345';

        const rootProducts = [
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
        ];

        const expectedRootProductName = 'MAJIK DS/2';

        expect(getRootProductName(rootProductUri, rootProducts)).toEqual(expectedRootProductName);
    });

    test('should return null when no match', () => {

        const rootProductUri = '/products/root-products/54321';

        const rootProducts = [
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
        ];

        expect(getRootProductName(rootProductUri, rootProducts)).toEqual(null);
    });
});