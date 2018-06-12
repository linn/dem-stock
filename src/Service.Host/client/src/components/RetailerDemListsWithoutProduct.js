import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, Button, Glyphicon } from 'react-bootstrap';
import RetailerDemListLine from './RetailerDemListLine';
import config from '../config';

class RetailerDemListsWithoutProduct extends Component {
    render() {
        const { retailerDemLists, retailers } = this.props;

        if (!retailerDemLists || !retailerDemLists.items || retailerDemLists.items.length === 0) {
            return (<div>
                <Grid fluid={false}>
                <Row><Loading /></Row>
                </Grid>
            </div>);
        }

        return (
            <div>
                <Grid fluid={false}> 
                    <Row>
                        <Col xs={8}>
                            <h3>Retailer dem lists that do not include </h3>
                        </Col>
                        <Col xs={2}>
                            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip1">Download report as CSV file</Tooltip>}>
                                <Button style={{ marginTop: '25px', marginBottom: '10px' }} href={`${config.appRoot}/retailers/dem-stock/lists-without-product/export`}><Glyphicon className="text-muted" glyph="export" /> Export</Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <Table>
                                <thead>
                                <tr>
                                    <th style={{ width: '45%' }}>Retailer Name</th>
                                    <th style={{ width: '20%' }}></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {retailerDemLists.items.map((retailer, i) => (<RetailerDemListLine retailerDemList={retailer} rowIndex={i} retailers={retailers} key={i} />) )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RetailerDemListsWithoutProduct;