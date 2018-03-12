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

export class EditableItem extends Component {
    render() {
        const { title, value, handleClick, displayOnly } = this.props;
        return (
            <Row>
                <Col sm={4} style={styles.title}>
                    <b>{title}</b>
                </Col>
                <Col sm={6}>
                    {displayOnly
                        ? value
                        : <Button bsStyle="link" style={styles.button} onClick={() => handleClick()}>{value}</Button>
                    }
                </Col>
            </Row>
        )
    }
}

export default EditableItem;
