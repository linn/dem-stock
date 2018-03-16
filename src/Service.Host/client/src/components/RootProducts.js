﻿import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { getRootProductName } from '../selectors/rootProductsSelectors';
import { IntegerUpdater } from './IntegerUpdater';
import { RemoveItem } from './RemoveItem';

class RootProducts extends Component {

    compare(a, b, rootProductDetails) {
        const nameA = getRootProductName(a.rootProductUri, rootProductDetails);
        const nameB = getRootProductName(b.rootProductUri, rootProductDetails);

        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    }


    render() {
        const { rootProducts, rootProductDetails, setRootProduct, retailerUri } = this.props;
        
        return rootProducts && rootProducts.length > 0
            ? (
                <div>
                    <Table striped bordered condensed responsive>
                        <thead>
                            <tr>
                                <th>Root Product</th>
                                <th className="col-md-4">Quantity</th>
                                <th>Last Changed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rootProducts.sort((a,b) => this.compare(a,b,rootProductDetails)).map((rootProduct, i) => (
                                <tr key={i}>
                                    <td><a href={rootProduct.rootProductUri}>{getRootProductName(rootProduct.rootProductUri, rootProductDetails)}</a></td>
                                    <td><IntegerUpdater
                                        title={`Update ${getRootProductName(rootProduct.rootProductUri, rootProductDetails)} Quantity`}
                                        value={rootProduct.quantity}
                                        displayOnly={false}
                                        required={true}
                                        onChange={value => setRootProduct(rootProduct.rootProductUri, value, retailerUri)} /></td>
                                    <td>{moment(rootProduct.updatedOn).format('DD MMM YYYY')}</td>
                                    <td className="text-center"><RemoveItem
                                        onConfirm={() => setRootProduct(rootProduct.rootProductUri, 0, retailerUri)}
                                        title={`Are you sure you want to remove ${getRootProductName(rootProduct.rootProductUri, rootProductDetails)}?`}/></td>
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