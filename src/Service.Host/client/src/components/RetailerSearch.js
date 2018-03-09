﻿import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import { Loading } from './common';

let timeoutId;

class RetailerSearch extends Component {
    state = { searchTerm: '' }

    render() {
        const { retailers, loading } = this.props;

        return (
            <div>
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
                </div>   </div>
        );
    }

    handleSearchTermChange(e) {
        const { searchRetailers } = this.props;
        const searchTerm = e.target.value;

        this.setState({ searchTerm });

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => searchRetailers(searchTerm), 500);
    }

    handleRetailerClick(retailer) {        
        const { clearRetailerSearch, history } = this.props;
        clearRetailerSearch();
        history.push(retailer.links.find(a => a.rel === 'self').href);
    }
}

export default RetailerSearch;