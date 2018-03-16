import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import DateUpdaterButton from './DateUpdaterButton';

const styles = {
    title: {
        textAlign: 'left',
        marginBottom: '6px',
        marginTop: '20px'
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
        const { title, value, onChange, titleWidth = 3, valueWidth = 9  } = this.props;
        return (
            <div>
                <Row>
                    <Col sm={12} style={styles.title}>
                        {title}
                        {value.format('DD MMM YYYY ')}
                        <DateUpdaterButton displayOnly={false} value={value} onChange={thedate => onChange(thedate)} />
                    </Col>
                    
                </Row>
            </div>
        );
    }
}

export default EditableDateItem;
