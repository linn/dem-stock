import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Button, Label, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';

class RetailerDemList extends Component {

    render() {
        const { loading, retailerName } = this.props;

        if (loading) {
            return (<Loading />);
        }

        return (
            <div>
                <Grid fluid={false}>
                    <Row>
                        <Col xs={10}>
                            <Row>
                                <Col sm={10}>
                                    <h2>{retailerName}</h2>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    </Row >

                    <div>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xs={12}>
                                <Well>
                                    <LinkContainer to='/sales/dem-stock'>
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