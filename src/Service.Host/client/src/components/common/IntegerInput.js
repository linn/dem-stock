import React, { Component } from 'react';
import { FormControl, Glyphicon, Button, FormGroup } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, onClose, onCancel } = this.props;
        return (<span>
                    <input style={{ maxWidth: '5em', marginRight: '10px' }} type="number" value={value} onChange={e => this.handleChange(e.target.value)} />
                    <Button bsClass="btn btn-xs btn-danger muted" onClick={() => onCancel()}><Glyphicon glyph="remove" /></Button>
                    <Button bsClass="btn btn-xs btn-success muted" onClick={() => onClose()}><Glyphicon glyph="ok" /></Button>
                </span>
        );
    }

    handleChange(value) {
        const { onChange } = this.props;
        const regex = /^$|^\d+$/;
        if (regex.test(value)) {
            onChange(value); 
        }
    }  
}