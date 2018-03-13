import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { getRootProductName } from '../selectors/rootProductsSelectors';

class RootProducts extends Component {
    render() {
        const { rootProducts, rootProductDetails } = this.props;

        return rootProducts && rootProducts.length > 0
            ? (
                <div>
                    <Table striped bordered condensed>
                        <thead>
                            <tr>
                                <th>Root Product</th>
                                <th>Quantity</th>
                                <th>Last Changed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rootProducts.map((rootProduct, i) => (
                                <tr key={i}>
                                    <td>{getRootProductName(rootProduct.rootProductUri, rootProductDetails)}</td>
                                    <td>{rootProduct.quantity}</td>
                                    <td>{moment(rootProduct.updatedOn).format('DD MMM YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
            : (
                <Alert bsStyle="warning">This retailer has no dem stock</Alert>
            );
    }
}

export default RootProducts;