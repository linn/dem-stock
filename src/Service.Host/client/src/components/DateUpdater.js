import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import InlineDatePicker from './common/InlineDatePicker';

const styles = {
    title: {
        textAlign: 'right',
        marginBottom: '6px'
    },
    button: {
        padding: '0',
        outline: 0
    }
}

export class DateUpdater extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false
        };
    }

    handleClick() {
        this.setState({ isOpen: true });
    }

    handleDateChange(dateSelected) {
        this.setState({ isOpen: false });
        dateSelected ? this.props.onChange(dateSelected) : this.props.onChange(this.props.value);
    }

    render() {
        const { value, displayOnly } = this.props;
        return (
            <div>
                {displayOnly
                    ? value.format('DD MMM YYYY')
                    : <Button bsStyle="link" style={styles.button} onClick={() => this.handleClick()}>{
                        value.format('DD MMM YYYY')}</Button>
                }
                <InlineDatePicker selectedDate={value}
                                  placeholder='Set last reviewed date'
                                  isOpen={this.state.isOpen}
                                  onChange={thedate => this.handleDateChange(thedate)} />
            </div>
        );
    }
}

export default DateUpdater;
