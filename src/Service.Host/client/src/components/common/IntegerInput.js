import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, validationCondition = (value || value === 0 ? null : "error")  } = this.props;
        return (
            <FormGroup style={{ margin: '0' }} validationState={validationCondition}>
                <FormControl type="text" value={value} onChange={e => this.handleChange(e.target.value)} />
            </FormGroup>
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