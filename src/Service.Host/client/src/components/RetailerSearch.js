import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem, Label, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { Loading } from './common';
import { getSelfHref } from '../helpers/utilities';
// import config from '../config';

class RetailerSearch extends Component {
    state = { searchTerm: '' }

    render() {
        const { retailers, loading, config } = this.props;

        return (
            <div>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Download report of all root products on retailer dem lists</Tooltip>}>
                    <Button 
                        style={{ marginTop: '25px', marginBottom: '10px', float: 'right' }} 
                        href={`${config.appRoot}/retailers/dem-stock/root-products/export`}>
                        <Glyphicon className="text-muted" glyph="export" /> 
                        Export
                    </Button>
                </OverlayTrigger>
                <h2>Select Retailer</h2 >                
                <div>
                    <FormGroup>
                        <ControlLabel>Search for retailer by name</ControlLabel>
                        <FormControl autoFocus value={this.state.searchTerm} onChange={e => this.handleSearchTermChange(e)} type="text" placeholder="Enter retailer name" ></FormControl>
                    </FormGroup>
                    {retailers.length > 0
                        ? (
                            <ListGroup>
                                {retailers.map((retailer, i) => (
                                    <ListGroupItem key={i} onClick={() => this.handleRetailerClick(retailer)}>{retailer.name} <Label className="pull-right" bsStyle="primary">{retailer.id}</Label></ListGroupItem>
                                ))}
                            </ListGroup>
                        )
                        : loading
                            ? <Loading />
                            : <span>No matching retailer</span>
                    }
                </div>
            </div>
        );
    }

    handleSearchTermChange(e) {
        const { searchRetailers } = this.props;
        const searchTerm = e.target.value;

        this.setState({ searchTerm });

        searchRetailers(searchTerm);
    }

    handleRetailerClick(retailer) {
        const { clearRetailerSearch, history, fetchRetailerDemList } = this.props;
        let retailerUri = getSelfHref(retailer);
        clearRetailerSearch();
        fetchRetailerDemList(retailerUri);
        history.push(`${retailerUri}/dem-stock`);
    }
}

export default RetailerSearch;