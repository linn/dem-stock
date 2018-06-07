import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import InlineDatePicker from './common/InlineDatePicker';

export class DateUpdaterButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false
        };
    }

    handleClick() {
        this.setState({ isOpen: true });
    }

    handleClose() {
        this.setState({ isOpen: false });
    }

    handleDateChange(dateSelected) {
        this.setState({ isOpen: false });
        dateSelected ? this.props.onChange(dateSelected) : this.props.onChange(this.props.value);
    }

    render() {
        const { value } = this.props;
        return (
            <span>
                <Button className="muted" bsStyle="primary" style={{ marginLeft:'5px' }} onClick={() => this.handleClick()}>Update</Button>
                <InlineDatePicker selectedDate={value}
                    placeholder='Set last reviewed date'
                    isOpen={this.state.isOpen}
                    onChange={thedate => this.handleDateChange(thedate)}
                    onClose={() => this.handleClose()} />
            </span>
        );
    }
}

export default DateUpdaterButton;
