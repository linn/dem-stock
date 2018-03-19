import React, { Component } from 'react';
import { FormControl, Glyphicon, Button, FormGroup } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, onClose, onCancel, okDisabled, onKeyDown } = this.props;
        return (<span>
                    <input 
                        style={{ maxWidth: '5em', marginRight: '20px' }} 
                        type="number" value={value} 
                        onChange={e => this.handleChange(e.target.value)} 
                        onKeyDown={key => onKeyDown(key.keyCode)}/>
                    <Button style={{ marginRight: '10px' }} bsClass="btn btn-xs btn-danger muted" onClick={() => onCancel()}><Glyphicon glyph="remove" /></Button>
                    <Button bsClass="btn btn-xs btn-success muted" onClick={() => onClose()} disabled={okDisabled()}><Glyphicon glyph="saved" /></Button>
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