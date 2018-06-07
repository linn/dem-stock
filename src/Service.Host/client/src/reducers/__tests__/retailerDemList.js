import retailerDemList from '../retailerDemList';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailer dem list reducer', () => {

    test('when requesting a retailer dem list', () => {
        const state = {
            retailerUri: null,
            loading: false,
            item: { retailerUri: '/retailers/11' }
        };

        const action = {
            type: actionTypes.REQUEST_RETAILER_DEM_LIST,
            payload: {
                retailerUri: '/retailers/11'
            }
        };

        const expected = {
            retailerUri: '/retailers/11',
            loading: true,            
            item: { retailerUri: '/retailers/11' }
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

    test('when receiving a retailer dem list', () => {
        const state = {
            retailerUri: '/retailers/11',
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_RETAILER_DEM_LIST,
            payload: {
                data: {
                    retailerUri: '/retailers/11',
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
                            href: '/retailers/11/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        };

        const expected = {
            retailerUri: '/retailers/11',
            loading: false,            
            item: {
                retailerUri: '/retailers/11',
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
                        href: '/retailers/11/dem-stock',
                        rel: 'self'
                    }
                ]
            }
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

    test('when requesting to update dem list details', () => {
        const state = {
            retailerUri: null,
            loading: false,
            item: null
        };

        const action = {
            type: actionTypes.REQUEST_UPDATE_DEM_LIST_DETAILS,
            payload: {
                retailerUri: '/retailers/11'
            }
        };

        const expected = {
            retailerUri: '/retailers/11',
            loading: true,
            item: null
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

    test('when receiving updated dem list details', () => {
        const state = {
            retailerUri: '/retailers/11',
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_UPDATE_DEM_LIST_DETAILS,
            payload: {
                data: {
                    retailerUri: '/retailers/11',
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
                            href: '/retailers/11/dem-stock',
                            rel: 'self'
                        }
                    ]
                }
            }
        };

        const expected = {
            retailerUri: '/retailers/11',
            loading: true,
            item: {
                retailerUri: '/retailers/11',
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
                        href: '/retailers/11/dem-stock',
                        rel: 'self'
                    }
                ]
            }
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

});