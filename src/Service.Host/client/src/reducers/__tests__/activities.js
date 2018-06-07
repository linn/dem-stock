import activities from '../activities';
import deepFreeze from 'deep-freeze';
import * as actionTypes from '../../actions';

describe('activities reducer', () => {

    test('when requesting activities', () => {
        const state = {
            loading: false,
            items: []
        };

        const action = {
            type: actionTypes.REQUEST_ACTIVITIES,
            payload: {
                retailerUri: '/retailers/701'
            }
        };

        const expected = {
            loading: true,
            items: []
        };

        deepFreeze(state);

        expect(activities(state, action)).toEqual(expected);
    });

    test('when receiving activities', () => {
        const state = {
            loading: true,
            items: []
        };

        const action = {
            type: actionTypes.RECEIVE_ACTIVITIES,
            payload: {
                data: {
                    activities: [
                        {
                            "rootProductUri": "/products/root-products/175",
                            "quantity": 1,
                            "activityType": "UpdateRootProductActivity",
                            "updatedByUri": null,
                            "changedOn": "2018-03-14T09:08:36.0229120",
                            "links": null
                        },
                        {
                            "rootProductUri": "/products/root-products/901",
                            "quantity": 1,
                            "activityType": "UpdateRootProductActivity",
                            "updatedByUri": null,
                            "changedOn": "2018-03-14T09:09:05.9000510",
                            "links": null
                        }
                    ]
                }
            }
        };

        const expected = {
            loading: false,
            items: [
                {
                    "rootProductUri": "/products/root-products/175",
                    "quantity": 1,
                    "activityType": "UpdateRootProductActivity",
                    "updatedByUri": null,
                    "changedOn": "2018-03-14T09:08:36.0229120",
                    "links": null
                },
                {
                    "rootProductUri": "/products/root-products/901",
                    "quantity": 1,
                    "activityType": "UpdateRootProductActivity",
                    "updatedByUri": null,
                    "changedOn": "2018-03-14T09:09:05.9000510",
                    "links": null
                }
            ]
        };

        deepFreeze(state);

        expect(activities(state, action)).toEqual(expected);
    });

});