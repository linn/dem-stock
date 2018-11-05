import React from 'react';
import { shallow, mount } from 'enzyme';
import RetailerSearch from '../RetailerSearch';
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Loading } from '../common';


describe('<RetailerSearch />', () => 
{
    describe('View Form', () => 
    {
        const wrapper = shallow(<RetailerSearch retailers={[]} loading={false} searchRetailers = {jest.fn()}  />);
        it('Should render Form', () => 
        {
            expect(wrapper.find(FormGroup)).toHaveLength(1);
            expect(wrapper.find(FormControl)).toHaveLength(1);
            expect(wrapper.find(ControlLabel)).toHaveLength(1);
        });  
    });
    


    describe('Edit Form', () =>
    {
        const wrapper = mount(<RetailerSearch retailers={[]} loading={false} searchRetailers={jest.fn()}  />);
        const input = wrapper.find(FormControl);
        
        it('Should update state on change', () => 
        {
            input.simulate('change', { target: { value: 'a search term' } });
            expect(wrapper.state().searchTerm).toBe('a search term');
        });

        
        it('Should call searchRetailers() on Change', () =>
        {
            expect(wrapper.props().searchRetailers.mock.calls.length).toBe(1);
            expect(wrapper.props().searchRetailers.mock.calls[0][0]).toBe('a search term');
        });           
    }); 
    
    
    
    
    
    describe('View Results', () =>
    { 
        it('Should not render any results before search', () =>
        {
            let wrapper = shallow(<RetailerSearch retailers={[]} 
                                    loading={false} 
                                    searchRetailers = {jest.fn()}  
                                  />);
            
            expect(wrapper.find(ListGroup)).toHaveLength(0);
            expect(wrapper.find(Loading)).toHaveLength(0);
        });

        
        it('Should render loading component if loading', () =>
        {
            let wrapper = shallow(<RetailerSearch retailers={[]} loading={true} />);
            expect(wrapper.find(Loading)).toHaveLength(1);
        });

        
        it('Should render correct number of list results', () =>
        {
            let mockResults = [{name: 'a',id: 0},{name: 'b',id: 1},{name: 'c',id: 2}];
            let wrapper = shallow(<RetailerSearch retailers={mockResults} loading={false} />);
            
            expect(wrapper.find(ListGroupItem)).toHaveLength(3);
        });
    });




    describe('Click on Results', () => 
    {
        const historyMock = { push: jest.fn() };
        const retailerMock = {links: [{href:"/test", rel:"self"}]};

        const wrapper = mount(<RetailerSearch 
                                retailers={[retailerMock]}  
                                loading={false} 
                                searchRetailers = {jest.fn()}
                                clearRetailerSearch = {jest.fn()} 
                                fetchRetailerDemList = {jest.fn()} 
                                history = {historyMock}  
                               />);

        
        it('Should process retailer click', () => 
        {
            let input = wrapper.find(ListGroupItem);
            input.simulate('click');
            
            expect(wrapper.props().history.push.mock.calls[0][0]).toBe('/test/dem-stock'); 
            expect(wrapper.props().history.push.mock.calls.length).toBe(1);
           
            expect(wrapper.props().clearRetailerSearch.mock.calls.length).toBe(1);
            expect(wrapper.props().fetchRetailerDemList.mock.calls.length).toBe(1);
               
        });    
        
    });
});