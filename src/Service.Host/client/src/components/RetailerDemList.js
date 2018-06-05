import React, { Component } from 'react';
import { Loading, MiniLoading } from './common';
import { Grid, Row, Col, Button, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';
import LastReviewedOn from './LastReviewedOn';
import moment from 'moment';
import RootProducts from './RootProducts';
import Activities from './Activities';
import RootProductSearch from '../containers/RootProductSearch';

class RetailerDemList extends Component {

    handleAddRootProductClick() {
        this.props.showRootProductSearch();
    }

    handleAddRootProduct(rootProductUri) {
        const { setRootProduct, retailerUri, retailerDemList } = this.props;

        if (!retailerDemList.rootProducts || !retailerDemList.rootProducts.some(r => r.rootProductUri === rootProductUri)) {
            setRootProduct(rootProductUri, 1, retailerUri);
        }
    }

    handleEditDateClick(d) {
        const { updateDemListDetails, retailerUri } = this.props;
        updateDemListDetails(d.toISOString(), retailerUri);
    }

    render() {
        const { retailerDemList, retailerDemListRootProducts, retailerName, setRootProduct, retailerUri, activities, loading, updating } = this.props;        

        if (!retailerDemList || loading && !updating) {
            return (<Loading />);
        }

        return (
            <div>
                <Grid fluid={false}> 
                    <h2 style={{ display:'inline-block' }}>{retailerName}</h2><span style={{ paddingLeft:'20px' }}>{updating && <MiniLoading />}</span>
                    <br />
                    <RootProducts
                        rootProducts={retailerDemListRootProducts}
                        setRootProduct={setRootProduct}
                        retailerUri={retailerUri} 
                        updating={updating} />
                    <Button disabled={updating} className="muted" bsStyle="success" onClick={() => this.handleAddRootProductClick()}>Add Root Product</Button>
                    <RootProductSearch onSelect={rootProductUri => this.handleAddRootProduct(rootProductUri)} />
                    <LastReviewedOn
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
                    <Activities activities={activities} updating={updating} />
                </Grid>
            </div>
        );
    }
}

export default RetailerDemList;