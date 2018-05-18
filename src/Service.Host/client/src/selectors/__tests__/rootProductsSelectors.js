import { getRootProductsToFetch, getRootProducts } from '../rootProductsSelectors';

describe('when selecting root products', () => {
    test('should return root products', () => {
        const state = {
            rootProducts: {
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
            }
        };

        const expected = [
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

        expect(getRootProducts(state)).toEqual(expected);
    });
});

describe('when getting products to fetch', () => {

    test('should return all uris', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-09-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/262',
                            quantity: 1,
                            updatedOn: '2018-04-24T15:17:23.7848480',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/1841',
                            quantity: 1,
                            updatedOn: '2018-03-16T14:43:11.3798430',
                            links: null
                        },
                    ]
                }
            },
            rootProducts: {
                loading: false,
                items: []
            },
            activities: [
                {
                    rootProductUri: '/products/root-products/175',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:08:36.0229120',
                    links: null
                },
                {
                    rootProductUri: '/products/root-products/901',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:09:05.9000510',
                    links: null
                },
            ]
        }

        const expected = [
            '/products/root-products/175',
            '/products/root-products/901',
            '/products/root-products/262',
            '/products/root-products/1841',
        ];

        expect(getRootProductsToFetch(state)).toEqual(expected);
    });

    test('should return uris not in root products state', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-09-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/262',
                            quantity: 1,
                            updatedOn: '2018-04-24T15:17:23.7848480',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/1841',
                            quantity: 1,
                            updatedOn: '2018-03-16T14:43:11.3798430',
                            links: null
                        },
                    ]
                }
            },
            rootProducts: {
                loading: false,
                items: [
                    {
                        rootProductUri: '/products/root-products/901',
                        loading: false,
                        item: {
                            href: '/products/root-products/901',
                            name: '226 AMP',
                            description: 'AMP MOD FOR AKURATE 226 BASS EXTENSION',
                            type: 'Root Product',
                            createdOn: '2014-01-09T16:16:45.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/901',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                    {
                        rootProductUri: '/products/root-products/1841',
                        loading: false,
                        item: {
                            href: '/products/root-products/1841',
                            name: 'KLI 350E/1',
                            description: 'KLIMAX EXAKT 350 FLOORSTANDING LOUDSPEAKER WITH KATALYST',
                            type: 'Root Product',
                            createdOn: '2016-12-06T11:05:08.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/1841',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                ],
            },
            activities: [
                {
                    rootProductUri: '/products/root-products/175',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:08:36.0229120',
                    links: null
                },
                {
                    rootProductUri: '/products/root-products/901',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:09:05.9000510',
                    links: null
                },
            ]
        }

        const expected = [
            '/products/root-products/175',
            '/products/root-products/262'
        ];

        expect(getRootProductsToFetch(state)).toEqual(expected);
    });

    test('should not return uris when all in state', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-09-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/262',
                            quantity: 1,
                            updatedOn: '2018-04-24T15:17:23.7848480',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/1841',
                            quantity: 1,
                            updatedOn: '2018-03-16T14:43:11.3798430',
                            links: null
                        },
                    ]
                }
            },
            rootProducts: {
                loading: false,
                items: [
                    {
                        rootProductUri: '/products/root-products/262',
                        loading: false,
                        item: {
                            href: '/products/root-products/262',
                            name: 'CDENG PLA',
                            description: 'OEM CD ENGINE - PLASTIC LOADER',
                            type: 'Root Product',
                            createdOn: '2003-06-01T00:00:00.0000000',
                            phasedOutOn: '2009-03-10T00:00:00.0000000',
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/262',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                    {
                        rootProductUri: '/products/root-products/901',
                        loading: false,
                        item: {
                            href: '/products/root-products/901',
                            name: '226 AMP',
                            description: 'AMP MOD FOR AKURATE 226 BASS EXTENSION',
                            type: 'Root Product',
                            createdOn: '2014-01-09T16:16:45.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/901',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                    {
                        rootProductUri: '/products/root-products/175',
                        loading: false,
                        item: {
                            href: '/products/root-products/175',
                            name: 'AK DSM',
                            description: 'AKURATE DSM DIGITAL MUSIC SYSTEM',
                            type: 'Root Product',
                            createdOn: '2011-09-01T00:00:00.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/175',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                    {
                        rootProductUri: '/products/root-products/1841',
                        loading: false,
                        item: {
                            href: '/products/root-products/1841',
                            name: 'KLI 350E/1',
                            description: 'KLIMAX EXAKT 350 FLOORSTANDING LOUDSPEAKER WITH KATALYST',
                            type: 'Root Product',
                            createdOn: '2016-12-06T11:05:08.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/1841',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                ],
            },
            activities: [
                {
                    rootProductUri: '/products/root-products/175',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:08:36.0229120',
                    links: null
                },
                {
                    rootProductUri: '/products/root-products/901',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:09:05.9000510',
                    links: null
                },
            ]
        }

        const expected = [];

        expect(getRootProductsToFetch(state)).toEqual(expected);
    });

    test('should not return null uris', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-09-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/262',
                            quantity: 1,
                            updatedOn: '2018-04-24T15:17:23.7848480',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/1841',
                            quantity: 1,
                            updatedOn: '2018-03-16T14:43:11.3798430',
                            links: null
                        },
                    ]
                }
            },
            rootProducts: {
                loading: false,
                items: [
                    {
                        rootProductUri: '/products/root-products/901',
                        loading: false,
                        item: {
                            href: '/products/root-products/901',
                            name: '226 AMP',
                            description: 'AMP MOD FOR AKURATE 226 BASS EXTENSION',
                            type: 'Root Product',
                            createdOn: '2014-01-09T16:16:45.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/901',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                    {
                        rootProductUri: '/products/root-products/1841',
                        loading: false,
                        item: {
                            href: '/products/root-products/1841',
                            name: 'KLI 350E/1',
                            description: 'KLIMAX EXAKT 350 FLOORSTANDING LOUDSPEAKER WITH KATALYST',
                            type: 'Root Product',
                            createdOn: '2016-12-06T11:05:08.0000000',
                            phasedOutOn: null,
                            children: null,
                            links: [
                                {
                                    href: '/products/root-products/1841',
                                    rel: 'self'
                                }
                            ]
                        }
                    },
                ],
            },
            activities: [
                {
                    rootProductUri: '/products/root-products/175',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:08:36.0229120',
                    links: null
                },
                {
                    rootProductUri: '/products/root-products/901',
                    quantity: 1,
                    activityType: 'UpdateRootProductActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:09:05.9000510',
                    links: null
                },
                {
                    lastReviewedOn: '2018-03-14T09:09:05.9000510',
                    activityType: 'UpdateLastReviewedOnActivity',
                    updatedByUri: null,
                    changedOn: '2018-03-14T09:09:05.9000510',
                    links: null
                },
            ]
        }

        const expected = [
            '/products/root-products/175',
            '/products/root-products/262'
        ];

        expect(getRootProductsToFetch(state)).toEqual(expected);
    });
});