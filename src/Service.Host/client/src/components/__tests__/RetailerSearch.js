import React from 'react';
import { shallow } from 'enzyme';
import RetailerSearch from '../RetailerSearch';
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Loading } from '../common';


describe('<RetailerSearch />', () => 
{
    let searchRetailers = jest.fn();
    let clearRetailerSearch = jest.fn();
    let fetchRetailerDemList = jest.fn();
    let historyMock = { push: jest.fn() };
    
    const defaultProps = {
        retailers: [{links: [{href:"/test", rel:"self"}]}],  
        loading: false,
        clearRetailerSearch : clearRetailerSearch,
        fetchRetailerDemList : fetchRetailerDemList,
        history : historyMock,
        searchRetailers : searchRetailers
    };

    


    describe('Edit Form', () =>
    {

        let wrapper = shallow(<RetailerSearch {...defaultProps} />);
        const input = wrapper.find(FormControl);
        input.simulate('change', { target: { value: 'a search term' } });
        
       

        
        it('Should call searchRetailers() on Change', () =>
        {
            expect(wrapper.state().searchTerm).toBe('a search term');
            expect(searchRetailers.mock.calls.length).toBe(1);
            expect(searchRetailers.mock.calls[0][0]).toBe('a search term');
        });           
    }); 
    
    

    describe('View Results', () =>
    { 
        it('Should not render any results before search', () =>
        {
            let wrapper = shallow(<RetailerSearch {...defaultProps} retailers = {[]}/>);
            expect(wrapper.find(ListGroup)).toHaveLength(0);
            expect(wrapper.find(Loading)).toHaveLength(0);
        });

        
        it('Should render loading component if loading', () =>
        {
            let wrapper = shallow(<RetailerSearch {...defaultProps} retailers = {[]} loading={true} />);
            expect(wrapper.find(Loading).length).toBe(1);
        });

        
        it('Should render correct number of list results', () =>
        {
            let wrapper = shallow(<RetailerSearch {...defaultProps} />);
            expect(wrapper.find(ListGroupItem)).toHaveLength(defaultProps.retailers.length);
        });
    });




    describe('Click on Results', () => 
    {
        
        let wrapper = shallow(<RetailerSearch {...defaultProps} />);

        
        it('Should process retailer click', () => 
        {
            let input = wrapper.find(ListGroupItem);
            input.simulate('click');
            
            expect(historyMock.push.mock.calls[0][0]).toBe('/test/dem-stock'); 
            expect(historyMock.push.mock.calls.length).toBe(1);
           
            expect(clearRetailerSearch.mock.calls.length).toBe(1);
            expect(fetchRetailerDemList.mock.calls.length).toBe(1);           
        });     
    });
});