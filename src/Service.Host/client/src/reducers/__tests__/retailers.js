import retailers from '../retailers';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('retailers reducer', () => {

    test('when requesting retailers', () => {
        const state = {
            loading: false,
            items: []
        };

        const action = {
            type: actionTypes.REQUEST_RETAILERS,
            payload: {}
        };

        const expected = {
            loading: true,            
            items: []
        };

        deepFreeze(state);

        expect(retailers(state, action)).toEqual(expected);
    });

    test('when receiving retailers', () => {
        const state = {
            loading: true,
            items: []
        };

        const action = {
            type: actionTypes.RECEIVE_RETAILERS,
            payload: {
                data: {
                    retailers: [
                        {
                            name: 'Tyson Newcastle'
                        }
                    ]
                }
            }
        };

        const expected = {
            loading: false,   
            items: [{
                name: 'Tyson Newcastle'
            }]
        };

        deepFreeze(state);

        expect(retailers(state, action)).toEqual(expected);
    });
});