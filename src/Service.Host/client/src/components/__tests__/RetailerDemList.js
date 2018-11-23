import { shallow } from 'enzyme';
import React from 'react';
import RetailerDemList from '../RetailerDemList';
import { Loading, MiniLoading } from '../common';
import { LastReviewedOn } from '../LastReviewedOn';
import moment from 'moment';
import { Button } from 'react-bootstrap';

describe('<RetailerDemList />', () => {
    let props;
    let mountedRetailerDemList;
    let updateDemListDetails;
    let showRootProductSearch;
    let setRootProduct;

    const retailerDemList = () => {
        if (!mountedRetailerDemList) {
            mountedRetailerDemList = shallow(
                <RetailerDemList {...props} />
            );
        }
        return mountedRetailerDemList;
    }

    beforeEach(() => {
        updateDemListDetails = jest.fn();
        showRootProductSearch = jest.fn();
        setRootProduct = jest.fn();

        props = {
            retailerDemList: {},
            retailerDemListRootProducts: [],
            retailerName: 'test',
            setRootProduct: setRootProduct,
            retailerUri: "/test",
            updating: true,
            activities: [],
            loading: false,
            updating: false,
            updateDemListDetails: updateDemListDetails,
            showRootProductSearch: showRootProductSearch,
            setRootProduct: setRootProduct
        };
        mountedRetailerDemList = undefined;
    });

    it('Should handle LastReviewdOn Click', () => {
        var d = moment();
        retailerDemList().find(LastReviewedOn).simulate('change', d);
        expect(updateDemListDetails).toBeCalledWith(d.toISOString(), props.retailerUri);
    });

    it('Should handle addRootProduct click', () => {
        retailerDemList().find(Button).at(0).simulate('click');
        expect(showRootProductSearch.mock.calls.length).toBe(1);
    });

    describe('when updating', () => {

        beforeEach(() => {
            props.updating = true;
        });

        it('Should render mini loading spinner', () => {
            expect(retailerDemList().find(MiniLoading).length).toBe(1);
        });
    });

    describe('when loading', () => {

        beforeEach(() => {
            props.loading = true;
            props.updating = false;
        });

        it('Should render loading spinner', () => {
            expect(retailerDemList().find(Loading).length).toBe(1);
        });
    });

    describe('when no dem lists', () => {

        beforeEach(() => {
            props.retailerDemList = undefined;
        });

        it('Should render loading spinner', () => {
            expect(retailerDemList().find(Loading).length).toBe(1);
        });
    });

    // unit test the handleAddRootProduct method directly
    test('handleAddRootProduct', () => {
        let instance = retailerDemList().instance();
        instance.handleAddRootProduct('/product');
        expect(setRootProduct).toHaveBeenCalledWith('/product', 1, '/test');
    });
}); 