import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PortalDatePicker from './common/PortalDatePicker';

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

export class EditableDateItem extends Component {
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
        const { title, value, displayOnly } = this.props;
        return (
            <div>
                <Row>
                    <Col sm={4} style={styles.title}>
                        <b>{title}</b>
                    </Col>
                    <Col sm={6}>
                        {displayOnly
                            ? value
                            : <Button bsStyle="link" style={styles.button} onClick={() => this.handleClick()}>{
                                value.format('DD MMM YYYY')}</Button>
                        }
                    </Col>
                </Row>
                <PortalDatePicker selectedDate={value}
                                  placeholder='Set last reviewed date'
                                  display='date'
                                  isOpen={this.state.isOpen}
                                  onChange={thedate => this.handleDateChange(thedate)} />
            </div>
        );
    }
}

export default EditableDateItem;
