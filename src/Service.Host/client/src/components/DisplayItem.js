import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';

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

export class DisplayItem extends Component {
    render() {
        const { title, value } = this.props;
        return (
            <Row>
                <Col sm={4} style={styles.title}>
                    <b>{title}</b>
                </Col>
                <Col sm={6}>
                    {value}
                </Col>
            </Row>
        )
    }
}

export default DisplayItem;
