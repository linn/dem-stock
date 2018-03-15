import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import DateUpdater from './DateUpdater';

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
    }

    render() {
        const { title, value, onChange } = this.props;
        return (
            <div>
                <Row>
                    <Col sm={4} style={styles.title}>
                        <b>{title}</b>
                    </Col>
                    <Col sm={6}>
                        <DateUpdater displayOnly={false} value={value} onChange={thedate => onChange(thedate)} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditableDateItem;
