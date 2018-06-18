import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Table, Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { formatDate } from '../helpers/dates';
import { getRetailer } from '../selectors/retailersSelectors';

class RetailerDemListLine extends Component {
    render() {
        const { retailerDemList, rowIndex, retailers } = this.props;

        return (
            <tr key={rowIndex}>
                <td>{getRetailer(retailerDemList.retailerId, retailers)
                    ? <a href={`/retailers/${retailerDemList.retailerId}`} target="_blank" > {getRetailer(retailerDemList.retailerId, retailers).name} </a>
                    : 'Loading details..'}
                </td>
                <td>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip1">Review the dem list for this retailer in a new tab</Tooltip>}>
                        <Button bsSize="small" href={`/retailers/${retailerDemList.retailerId}/dem-stock`} target="_blank"><Glyphicon className="text-muted" glyph="edit" />
                        </Button>
                    </OverlayTrigger>
                </td>
            </tr>);
    }
}

export default RetailerDemListLine;