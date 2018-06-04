import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import RetailerDemListLine from './RetailerDemListLine';

class RetailerDemLists extends Component {
    render() {
        const { retailerDemLists, retailers } = this.props;

        if (!retailerDemLists || !retailerDemLists.items) {
            return (<div>
                        <Grid fluid={false}>
                            <h2>Retailer dem lists - Time since last review (Loading)</h2>
                            <br />
                        </Grid>
                    </div>);
        }

        return (
            <div>
                <Grid fluid={false}> 
                    <h2>Retailer dem lists - Time since last review</h2>
                    <br />
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width: '45%' }}>Retailer Name</th>
                            <th style={{ width: '20%' }}>Last Reviewed</th>
                            <th style={{ width: '15%' }}></th>
                            <th style={{ width: '20%' }}></th>
                        </tr>
                        </thead>
                        <tbody>
                            {retailerDemLists.items.map((retailer, i) => (<RetailerDemListLine retailerDemList={retailer} rowIndex={i} retailers={retailers} />) )}
                        </tbody>
                    </Table>
                </Grid>
            </div>
        );
    }
}

export default RetailerDemLists;