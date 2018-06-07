import { getRetailerDemList, getRetailerDemListRetailerUri, getRetailerDemListLoading, getRetailerDemListRootProducts, getRetailerDemListUpdating } from '../retailerDemListSelectors';

describe('when selecting retailer dem list loading', () => {
    test('should return loading when dem list loading', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: true,
                item: null
            },
            rootProducts: {
                loaded: true,
                loading: false,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListLoading(state)).toEqual(true);
    });

    test('should return loading when other object loading', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: null
            },
            rootProducts: {
                loaded: true,
                loading: false,
                items: []
            },
            retailer: {
                loading: true,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListLoading(state)).toEqual(true);
    });

    test('should return false when no object loading', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: null
            },
            rootProducts: {
                loaded: true,
                loading: false,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListLoading(state)).toEqual(false);
    });

    test('should return true when root products loading', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: null
            },
            rootProducts: {
                loaded: false,
                loading: true,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListLoading(state)).toEqual(true);
    });
});

describe('when selecting retailer dem list updating', () => {
    test('should return true when dem list updating', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: true,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-04-29T06:00:00.0000000Z',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/114',
                            quantity: 1,
                            updatedOn: '2018-05-24T11:13:56.7047940',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/40',
                            quantity: 1,
                            updatedOn: '2018-05-24T14:50:23.6074670',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/280',
                            quantity: 2,
                            updatedOn: '2018-05-24T15:18:54.4654560',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        },
                        {
                            href: '/retailers/734',
                            rel: 'retailer'
                        }
                    ]
                },
            },
            rootProducts: {
                loading: false,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListUpdating(state)).toEqual(true);
    });

    test('should return true when other object updating', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {}
            },
            rootProducts: {
                loading: false,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: true,
                items: [
                    {
                        rootProductUri: '/products/root-products/175',
                        quantity: 1,
                        activityType: 'UpdateRootProductActivity',
                        updatedByUri: '/employees/3306',
                        changedOn: '2018-03-14T09:08:36.0229120',
                        links: null
                    },
                    {
                        quantity: 1,
                        activityType: 'UpdateLastReviewedOnActivity',
                        updatedByUri: '/employees/123',
                        changedOn: '2018-03-14T09:09:05.9000510',
                        links: null
                    },
                    {
                        rootProductUri: '/products/root-products/901',
                        quantity: 1,
                        activityType: 'UpdateRootProductActivity',
                        updatedByUri: null,
                        changedOn: '2018-03-14T09:09:05.9000510',
                        links: null
                    }
                ]
            }
        }

        expect(getRetailerDemListUpdating(state)).toEqual(true);
    });

    test('should return true when root products updating', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: null
            },
            rootProducts: {
                loaded: true,
                loading: true,
                items: []
            },
            retailer: {
                loading: false,
                item: {}
            },
            employees: {
                loading: false,
                items: {}
            },
            activities: {
                loading: false,
                items: {}
            }
        }

        expect(getRetailerDemListUpdating(state)).toEqual(true);
    });
});

describe('when selecting retailer dem list', () => {
    test('should return retailer dem list', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerUri: '/retailers/734',
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/150',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        }

        const expectedResult = {
            retailerUri: '/retailers/734',
            lastReviewedOn: '2018-03-09T00:00:00.0000000',
            rootProducts: [
                {
                    rootProductUri: '/products/root-products/150',
                    quantity: 3,
                    updatedOn: '2018-03-09T00:00:00.0000000',
                    links: null
                }
            ],
            links: [
                {
                    href: '/retailers/734/dem-stock',
                    rel: 'self'
                }
            ]
        }
        expect(getRetailerDemList(state)).toEqual(expectedResult);
    });
});

describe('when selecting retailer dem list but not found', () => {
    test('should return null', () => {
        const retailerDemList = {}

        expect(getRetailerDemList(retailerDemList)).toEqual(null);
    });
});

describe('when selecting retailer uri', () => {
    test('should return retailer uri', () => {
        const state = {
            retailerDemList: {
                loading: false,
                item: {
                    retailerId: 734,
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/150',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        }

        const expected = '/retailers/734';

        expect(getRetailerDemListRetailerUri(state)).toEqual(expected);
    });
});

describe('when selecting retailer dem list root products', () => {
    test('should return retailer dem list root products with name', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerUri: '/retailers/734',
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/12345',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/67890',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            },
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
        }

        const expectedResult = [
            {
                rootProductUri: '/products/root-products/12345',
                quantity: 3,
                updatedOn: '2018-03-09T00:00:00.0000000',
                links: null,
                name: 'MAJIK DS/2'
            },
            {
                rootProductUri: '/products/root-products/67890',
                quantity: 3,
                updatedOn: '2018-03-09T00:00:00.0000000',
                links: null,
                name: 'KLIMAX DSM/3',
            }
        ];

        expect(getRetailerDemListRootProducts(state)).toEqual(expectedResult);
    });

    test('should not return retailer dem list root products without name', () => {
        const state = {
            retailerDemList: {
                retailerUri: '/retailers/734',
                loading: false,
                item: {
                    retailerUri: '/retailers/734',
                    lastReviewedOn: '2018-03-09T00:00:00.0000000',
                    rootProducts: [
                        {
                            rootProductUri: '/products/root-products/12345',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        },
                        {
                            rootProductUri: '/products/root-products/67890',
                            quantity: 3,
                            updatedOn: '2018-03-09T00:00:00.0000000',
                            links: null
                        }
                    ],
                    links: [
                        {
                            href: '/retailers/734/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            },
            rootProducts: {
                loading: false,
                items: [
                    {
                        rootProductUri: "/products/root-products/12345",
                        loading: true,
                        item: {}
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
        }

        const expectedResult = [
            {
                rootProductUri: '/products/root-products/67890',
                quantity: 3,
                updatedOn: '2018-03-09T00:00:00.0000000',
                links: null,
                name: 'KLIMAX DSM/3',
            }
        ];

        expect(getRetailerDemListRootProducts(state)).toEqual(expectedResult);
    });
});