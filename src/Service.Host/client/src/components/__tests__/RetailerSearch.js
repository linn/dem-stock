import React from 'react';
import { shallow } from 'enzyme';
import RetailerSearch from '../RetailerSearch';
import { FormControl, ListGroupItem } from 'react-bootstrap';
import { Loading } from '../common';
// import config from '../../config';

describe('<RetailerSearch />', () => {
    let props;
    let mountedRetailerSearch;
    let searchRetailers;
    let clearRetailerSearch;
    let fetchRetailerDemList;
    let historyMock;// = { push: jest.fn() };
    let config;

    const retailerSearch = () => {
        if (!mountedRetailerSearch) {
            mountedRetailerSearch = shallow(
                <RetailerSearch {...props} />
            );
        }
        return mountedRetailerSearch;
    }

    beforeEach(() => {
        searchRetailers = jest.fn();
        clearRetailerSearch = jest.fn();
        fetchRetailerDemList = jest.fn();
        config = jest.fn(() => ({
            appRoot: 'app.linn.co.uk'
        }));
        historyMock = { push: jest.fn() };
        props = {
            retailers: [],
            loading: false,
            clearRetailerSearch: clearRetailerSearch,
            fetchRetailerDemList: fetchRetailerDemList,
            history: historyMock,
            searchRetailers: searchRetailers,
            config
        };
        mountedRetailerSearch = undefined;
    });

    it('Should call searchRetailers() on Change', () => {
        retailerSearch().find(FormControl).simulate('change', { target: { value: 'a search term' } });
        expect(retailerSearch().state().searchTerm).toBe('a search term');
        expect(searchRetailers.mock.calls.length).toBe(1);
        expect(searchRetailers.mock.calls[0][0]).toBe('a search term');
    });

    describe('When Loading', () => {

        beforeEach(() => {
            props.loading = true;
        });

        it('renders loading spinner', () => {
            expect(retailerSearch().find(Loading).length).toBe(1);
        });
    });

    describe('When Search Results', () => {

        beforeEach(() => {
            props.retailers = [{ links: [{ href: "/test", rel: "self" }] }];
        });

        it('should render correct number of results', () => {
            expect(retailerSearch().find(ListGroupItem)).toHaveLength(props.retailers.length);
        });

        it('should handle retailer click', () => {
            retailerSearch().find(ListGroupItem).simulate('click');
            expect(historyMock.push.mock.calls[0][0]).toBe('/test/dem-stock');
            expect(historyMock.push.mock.calls.length).toBe(1);
            expect(clearRetailerSearch.mock.calls.length).toBe(1);
            expect(fetchRetailerDemList.mock.calls.length).toBe(1);
        });
    });
});