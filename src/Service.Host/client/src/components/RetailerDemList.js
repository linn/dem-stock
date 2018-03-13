import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Button, Label, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';
import EditableItem from './EditableItem';
import moment from 'moment';
import RootProducts from './RootProducts';

class RetailerDemList extends Component {

    render() {
        const { loading, retailerDemList, retailerName, rootProducts } = this.props;

        if (loading  || !retailerDemList) {
            return (<Loading />);
        }

        return (
            <div>
                <Grid fluid={false}>
                    <Row>
                        <Col sm={2}> </Col>
                        <Col sm={8}>
                            <h2>{retailerName}</h2>
                        </Col>
                    </Row>
                    <br />
            
                    <EditableItem title="Last Reviewed On" value={moment(retailerDemList.lastReviewedOn).format('DD MMM YYYY')} displayOnly={true} />
                    <EditableItem title="Root Products" value={<RootProducts rootProducts={retailerDemList.rootProducts} rootProductDetails={rootProducts} />} displayOnly={true} />
                   
                    <div>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xs={12}>
                                <Well>
                                    <LinkContainer to='/retailers/dem-stock'>
                                        <Button bsStyle="link">Back</Button>
                                    </LinkContainer>
                                </Well>
                            </Col>
                        </Row>
                    </div>
                </Grid>                
            </div>
        );
    }
}

export default RetailerDemList;