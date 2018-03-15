import React, { Component } from 'react';
import { FormControl, Glyphicon, Button, FormGroup } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, onClose, onCancel } = this.props;
        return (<div>
                    <input type="number" value={value} onChange={e => this.handleChange(e.target.value)} />
                    <Button bsStyle="link" onClick={() => onCancel()}>Cancel</Button>
                    <Button bsStyle="link" onClick={() => onClose()}>Save</Button>
                </div>
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