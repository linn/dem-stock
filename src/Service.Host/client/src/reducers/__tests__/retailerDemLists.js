import retailerDemLists from '../retailerDemLists';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailer dem lists reducer', () => {

    test('when requesting retailer dem lists', () => {
        const state = {
            loading: false,
            items: []
        };

        const action = {
            type: actionTypes.REQUEST_RETAILER_DEM_LISTS,
            payload: {}
        };

        const expected = {
            loading: true,            
            items: []
        };

        deepFreeze(state);

        expect(retailerDemLists(state, action)).toEqual(expected);
    });

    test('when receiving retailer dem lists', () => {
        const state = {
            loading: true,
            items: []
        };

        const action = {
            type: actionTypes.RECEIVE_RETAILER_DEM_LISTS,
            payload: {
                data: [
                        {
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
                    ]
            }
        };

        const expected = {
            loading: false,            
            items: [{
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
            }]
        };

        deepFreeze(state);

        expect(retailerDemLists(state, action)).toEqual(expected);
    });
});