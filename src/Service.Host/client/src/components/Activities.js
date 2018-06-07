import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Alert } from 'react-bootstrap';
import moment from 'moment';
import ActivityItem from './ActivityItem';

class Activities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewActivities: false
        }
    }

    compare(a,b) {
        return moment.utc(b.changedOn).diff(moment.utc(a.changedOn))
    }

    render() {
        const { activities, updating } = this.props;

        return activities && activities.length > 0 || updating
            ? (
                <div>
                    <h4 className="pull-left">Activity History</h4>
                    <Button 
                        bsStyle="default" 
                        className="muted" 
                        disabled={updating} 
                        style={{ marginLeft: '10px', marginBottom: '10px' }} 
                        onClick={() => this.handleViewActivitiesClick()}>
                            {this.state.viewActivities ? 'Hide' : 'View'}
                    </Button>
                    {this.state.viewActivities
                        ? (
                            <ListGroup>
                                {activities
                                    .sort((a,b) => this.compare(a,b))
                                    .map((activity, i) => (
                                        <ActivityItem activity={activity} key={i} />
                                ))}
                            </ListGroup>) 
                        : (
                            <span/>
                        )
                    }                    
                </div>
            )
            : (
                <Alert bsStyle="warning">This retailer dem list has no activities</Alert>
            );
    }

    handleViewActivitiesClick() {
        this.setState({viewActivities: !this.state.viewActivities});
    }
}

export default Activities;