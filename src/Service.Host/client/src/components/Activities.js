﻿import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import ActivityItem from './ActivityItem';

class Activities extends Component {

    compare(a,b) {
        return moment.utc(b.changedOn).diff(moment.utc(a.changedOn))
    }

    render() {
        const { activities, rootProductDetails } = this.props;

        return activities && activities.length > 0
            ? (
                <div>
                    <h4>Activity History</h4>
                    <ListGroup>
                        {activities
                            .sort((a,b) => this.compare(a,b))
                            .map((activity, i) => (
                                <ActivityItem activity={activity} rootProductDetails={rootProductDetails} key={i} />
                        ))}
                    </ListGroup>
                </div>
            )
            : (
                <Alert bsStyle="warning">This retailer dem list has no activities</Alert>
            );
    }
}

export default Activities;