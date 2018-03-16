import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Button, Label, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';
import DisplayItem from './DisplayItem';
import LastReviewedOn from './LastReviewedOn';
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
        const { retailerDemList, retailerName, rootProducts, setRootProduct, retailerUri } = this.props;

        if (!retailerDemList) {
            return (<Loading />);
        }

        return (
            <div>
                <Grid fluid={false}> 
                    <DisplayItem
                        titleWidth={0}
                        value={<h2>{retailerName}</h2>} />
                    <br />
                    <DisplayItem
                        titleWidth={0}
                        valueWidth={12}
                        value={<RootProducts
                                    rootProducts={retailerDemList.rootProducts}
                                    rootProductDetails={rootProducts}
                                    setRootProduct={setRootProduct}
                                    retailerUri={retailerUri} />}
                    />
                    <DisplayItem                        
                        value={<Button className="muted" bsStyle="success" onClick={() => this.handleAddRootProductClick()}>Add Root Product</Button>}
                        titleWidth={0}
                        valueWidth={12}
                    />                    
                    <RootProductSearch onSelect={rootProductUri => this.handleAddRootProduct(rootProductUri)} />
                    <LastReviewedOn
                        titleWidth={3}
                        valueWidth={9}
                        title="Last reviewed on "
                        value={retailerDemList.lastReviewedOn ? moment(retailerDemList.lastReviewedOn) : null}
                        displayOnly={false}
                        onChange={(d) => this.handleEditDateClick(d)} />
                    <div>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xs={12}>
                                <Well bsSize="small">
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