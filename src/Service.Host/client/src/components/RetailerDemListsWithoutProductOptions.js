import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, FormGroup, FormControl, ListGroup, InputGroup, ListGroupItem } from 'react-bootstrap';
import RootProductSearchTypeahead from './RootProductSearchTypeahead';

class RetailerDemListsWithoutProductOptions extends Component {
    handleProductClick(product) {
        const { history } = this.props;

        history.push(
            {
                pathname: `/retailers/dem-stock/lists-without-product/report`,
                search: `?productUri=${product.href}`,
                state: { product }
            }
        );
    }

    render() {
        const { rootProducts, loading, searchTerm, setRootProductSearchTerm } = this.props;

        return (
            <Grid fluid={false}>
                <PageHeader>
                    <small>Show retailer dem lists that don't include selected root product</small>
                </PageHeader>
                <Row>
                    <Col xs={2}>
                        Select product
                    </Col>
                    <Col xs={10}>
                        <RootProductSearchTypeahead
                            rootProducts={rootProducts}
                            loading={loading}
                            searchTerm={searchTerm}
                            setRootProductSearchTerm={setRootProductSearchTerm}
                            handleClick={(product) => this.handleProductClick(product)}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default RetailerDemListsWithoutProductOptions;