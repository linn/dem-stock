import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class ActivityItem extends Component {

    selectActivity(activity, updatedByName, rootProductName) {
        switch (activity.activityType) {
            case 'UpdateRootProductActivity':
                return (
                    <React.Fragment>
                        <b>{rootProductName ? rootProductName : 'Unknown root product'} </b>
                        quantity updated to <b>{activity.quantity} </b>
                        by <b>{updatedByName ? updatedByName : 'unknown user'}</b>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).fromNow()}</span>
                    </React.Fragment>
                );

            case 'UpdateLastReviewedOnActivity':
                return (
                    <React.Fragment>
                        <b>Last reviewed on </b>
                        {activity.lastReviewedOn
                            ? <span>updated to<b> {moment(activity.lastReviewedOn).format('DD MMM YYYY ')} </b>
                                by <b>{updatedByName ? updatedByName : 'unknown user'}</b></span>
                            : <span>removed by <b>{updatedByName ? updatedByName : 'unknown user'}</b></span>
                        }
                        <span className="small pull-right text-muted">{moment(activity.changedOn).fromNow()}</span>
                    </React.Fragment>
                );

            case 'UpdateIsOpenActivity':
                return (
                    <React.Fragment>
                        <b>Is for open retailer </b>
                        <span>updated to <b>{activity.isForOpenRetailer ? 'True ' : 'False '}</b></span>
                        <span>by <b>{updatedByName ? updatedByName : 'unknown user'}</b></span>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).fromNow()}</span>
                    </React.Fragment>
                );

            case 'CreateRetailerDemListActivity':
                return (
                    <React.Fragment>
                        <b>Dem list created </b>
                        <span>by <b>{updatedByName ? updatedByName : 'unknown user'}</b></span>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).fromNow()}</span>
                    </React.Fragment>
                );

            default:
                return (
                    <React.Fragment>
                        <b>Unknown activity </b>
                        <span>by <b>{updatedByName ? updatedByName : 'unknown user'}</b></span>
                        <span className="small pull-right text-muted">{moment(activity.changedOn).fromNow()}</span>
                    </React.Fragment>
                );
        }
    }

    render() {
        const { activity, updatedByName, rootProductName } = this.props;

        return (
            <ListGroupItem>{this.selectActivity(activity, updatedByName, rootProductName)}</ListGroupItem>
        );
    }
}

export default ActivityItem;