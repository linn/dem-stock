import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class RootProducts extends Component {
    render() {
        const { rootProducts } = this.props;

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
                                    <td>{rootProduct.rootProductUri}</td>
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