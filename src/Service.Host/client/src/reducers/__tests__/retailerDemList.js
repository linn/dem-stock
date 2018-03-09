import retailerDemList from '../retailerDemList';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailer dem list reducer', () => {

    test('when requesting a retailer dem list', () => {
        const state = {
            retailerDemListUri: null,
            loading: false,
            item: null
        };

        const action = {
            type: actionTypes.REQUEST_RETAILER_DEM_LIST,
            payload: {
                retailerDemListUri: '/sales/dem-stock/retailer-dem-lists/1'
            }
        };

        const expected = {
            retailerDemListUri: '/sales/dem-stock/retailer-dem-lists/1',
            loading: true,            
            item: null
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

    test('when receiving a retailer dem list', () => {
        const state = {
            retailerDemListUri: '/sales/dem-stock/retailer-dem-lists/1',
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_RETAILER_DEM_LIST,
            payload: {
                data: {
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
                            href: '/sales/dem-stock/retailer-dem-lists/1',
                            rel: 'self'
                        }
                    ]
                }
            }
        };

        const expected = {
            retailerDemListUri: '/sales/dem-stock/retailer-dem-lists/1',
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
                        href: '/sales/dem-stock/retailer-dem-lists/1',
                        rel: 'self'
                    }
                ]
            }
        };

        deepFreeze(state);

        expect(retailerDemList(state, action)).toEqual(expected);
    });

});