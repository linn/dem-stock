import retailer from '../retailer';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailer reducer', () => {

    test('when requesting a retailer', () => {
        const state = {
            retailerUri: null,
            loading: false,
            item: { name: 'Tyson Newcastle' }
        };

        const action = {
            type: actionTypes.REQUEST_RETAILER,
            payload: {
                retailerUri: '/retailers/1'
            }
        };

        const expected = {
            retailerUri: '/retailers/1',
            loading: true,            
            item: { name: 'Tyson Newcastle' }
        };

        deepFreeze(state);

        expect(retailer(state, action)).toEqual(expected);
    });

    test('when receiving a retailer', () => {
        const state = {
            retailerUri: '/retailers/1',
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_RETAILER,
            payload: {
                data: {
                    name: 'Tyson Newcastle'
                }
            }
        };

        const expected = {
            retailerUri: '/retailers/1',
            loading: false,   
            item: {
                name: 'Tyson Newcastle'
            }
        };

        deepFreeze(state);

        expect(retailer(state, action)).toEqual(expected);
    });

});