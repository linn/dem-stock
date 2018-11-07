import { shallow } from 'enzyme';
import React from 'react';
import RetailerDemList from '../RetailerDemList';
import { MiniLoading } from '../common';
import { LastReviewedOn } from '../LastReviewedOn';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import RootProductSearch from '../RootProductSearch';




describe('<RetailerDemList />', () => 
{
    
        let updateDemListDetails = jest.fn();
        let showRootProductSearch = jest.fn();
        let setRootProduct = jest.fn();
        
        let defaultProps = {
                            retailerDemList: {},  
                            retailerDemListRootProducts : [],
                            retailerName : 'test',
                            setRootProduct : setRootProduct,
                            retailerUri : "/test",
                            updating : true,
                            activities :[],
                            loading : false,
                            updating : false,
                        }
       
        let wrapper;

       
        
        it('Should render loading spinner when updating', () => 
        {
            wrapper = shallow(<RetailerDemList {...defaultProps}  updating = {true}/>);
            expect(wrapper.find(MiniLoading).length).toBe(1);
            
        });


        it('Should handle LastReviewdOn Click', () => 
        {
            wrapper = shallow(<RetailerDemList {...defaultProps} updateDemListDetails = {updateDemListDetails}/>);
            var d = moment();
            wrapper.find(LastReviewedOn).simulate('change', d);
            expect(updateDemListDetails).toBeCalledWith(d.toISOString(), defaultProps.retailerUri);
        });

        it('Should handle addRootProduct click', () => 
        {
            wrapper = shallow(<RetailerDemList {...defaultProps} showRootProductSearch = {showRootProductSearch} />);
            wrapper.find(Button).at(0).simulate('click');
            expect(showRootProductSearch.mock.calls.length).toBe(1);       
        });



        test('handleAddRootProduct', () =>
        {
            let wrapper = shallow(<RetailerDemList {...defaultProps} />);
            let instance = wrapper.instance();
            instance.handleAddRootProduct('/product');
            expect(setRootProduct).toHaveBeenCalledWith('/product', 1, '/test');

        });

        


});