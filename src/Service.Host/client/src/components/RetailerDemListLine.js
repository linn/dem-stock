import React, { Component } from 'react';
import { Loading } from './common';
import { Grid, Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formatDate } from '../helpers/dates';
import moment from 'moment';
import { getRetailer } from '../selectors/retailersSelectors';

class RetailerDemListLine extends Component {
    render() {
        const { retailerDemList, i, retailers } = this.props;

        return (
            <tr key={i}>
                <td>{getRetailer(retailerDemList.retailerId, retailers)
                    ? <a href={`/retailers/${retailerDemList.retailerId}`} target="_blank" > {getRetailer(retailerDemList.retailerId, retailers).name} </a>
                    : 'Loading details..'}
                </td>
                <td>{retailerDemList.lastReviewedOn
                    ? moment(retailerDemList.lastReviewedOn).format('DD MMM YYYY ')
                    : 'Never'}
                </td>
                <td className="small text-muted">
                    {retailerDemList.lastReviewedOn
                        ? moment(retailerDemList.lastReviewedOn).fromNow()
                        : ''}
                </td>
                <td>
                    <Button bsSize="small" href={`/retailers/${retailerDemList.retailerId}/dem-stock`} target="_blank"><Glyphicon className="text-muted" glyph="edit" />
                    </Button>
                </td>
            </tr>);
    }
}

export default RetailerDemListLine;