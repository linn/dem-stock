import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class ActivityItem extends Component {
    render() {
        const { activity } = this.props;

        return activity.activityType === 'UpdateRootProductActivity'
            ? (<ListGroupItem>
                    <b>{activity.rootProductName ? activity.rootProductName : 'Unknown root product'} </b>
                    quantity updated to <b>{activity.quantity} </b>
                    by <b>{activity.updatedByName ? activity.updatedByName : 'unknown user'}</b>
                    <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()
                    }</span>
                </ListGroupItem>)
            : activity.activityType === 'UpdateLastReviewedOnActivity'
                ? (<ListGroupItem>
                        <b>Last reviewed on </b>
                        {activity.lastReviewedOn
                            ? <span>updated to<b> {moment(activity.lastReviewedOn).format('DD MMM YYYY ')} </b>
                                by <b>{activity.updatedByName ? activity.updatedByName : 'unknown user'}</b></span>
                            : <span>removed by <b>{activity.updatedBy ? activity.updatedBy : 'unknown user'}</b></span>
                        }
                        <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()
                        }</span>
                   </ListGroupItem>)
                : activity.activityType === 'CreateRetailerDemListActivity'
                    ? (<ListGroupItem>
                        <b>Dem list created </b>
                        <span>by <b>{activity.updatedByName ? activity.updatedByName : 'unknown user'}</b></span>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()}</span>
                        </ListGroupItem>)
                    : (<ListGroupItem>
                        <b>Unknown activity </b>
                        <span>by <b>{activity.updatedByName ? activity.updatedByName : 'unknown user'}</b></span>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).startOf('hour').fromNow()}</span>
                    </ListGroupItem>);
    }
}

export default ActivityItem;