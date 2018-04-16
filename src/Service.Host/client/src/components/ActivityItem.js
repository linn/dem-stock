import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import { getRootProductName } from '../selectors/rootProductsSelectors';

class ActivityItem extends Component {
    render() {
        const { activity, rootProductDetails } = this.props;

        const isRootProductUpdate = (activity.activityType === 'UpdateRootProductActivity');
        
        return isRootProductUpdate 
        ? (
            <ListGroupItem>
                <b>{getRootProductName(activity.rootProductUri, rootProductDetails)} </b>
                quantity updated to <b>{activity.quantity} </b>
                by <b>{activity.updatedBy ? activity.updatedBy : 'unknown user'}</b>
                <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()}</span>
            </ListGroupItem>
        )
        : (
            <ListGroupItem>
                <b>Last reviewed on </b>
                {activity.lastReviewedOn 
                    ? <span>updated to<b> {moment(activity.lastReviewedOn).format('DD MMM YYYY ')} </b>
                        by <b>{activity.updatedBy ? activity.updatedBy : 'unknown user'}</b></span>
                    : <span>removed by <b>{activity.updatedBy ? activity.updatedBy : 'unknown user'}</b></span>
                }
                <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()}</span>
            </ListGroupItem>
        )
    }
}

export default ActivityItem;