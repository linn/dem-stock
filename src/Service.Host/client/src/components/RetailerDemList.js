import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Button, Label, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';
import DisplayItem from './DisplayItem';
import EditableDateItem from './EditableDateItem';
import moment from 'moment';
import RootProducts from './RootProducts';
import RootProductSearch from '../containers/RootProductSearch';
import { getRetailerDemListRetailerUri } from '../selectors/retailerDemListSelectors';

class RetailerDemList extends Component {

    handleAddRootProductClick() {
        this.props.showRootProductSearch();
    }

    handleAddRootProduct(rootProductUri) {
        const { setRootProduct, retailerUri } = this.props;
        setRootProduct(rootProductUri, 1, retailerUri);
    }

    handleEditDateClick(d) {
        const { updateDemListDetails, retailerUri } = this.props;
        updateDemListDetails(d.toISOString(), retailerUri);
    }

    render() {
        const { loading, retailerDemList, retailerName, rootProducts, setRootProduct, retailerUri } = this.props;

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
                    <EditableDateItem title="Last Reviewed On" value={moment(retailerDemList.lastReviewedOn)} displayOnly={false} onChange={(d) => this.handleEditDateClick(d)} />
                    <DisplayItem
                        title="Root Products"
                        value={<RootProducts rootProducts={retailerDemList.rootProducts} rootProductDetails={rootProducts} setRootProduct={setRootProduct} retailerUri={retailerUri} />}
                        displayOnly={true} />
                    <Row>
                        <Col sm={4}> </Col>
                        <Col sm={8}>
                            <Button className="muted" bsStyle="success" onClick={() => this.handleAddRootProductClick()}>Add Root Product</Button>
                        </Col>
                    </Row>
                    <RootProductSearch onSelect={rootProductUri => this.handleAddRootProduct(rootProductUri)} />
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