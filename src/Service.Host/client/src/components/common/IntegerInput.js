import React, { Component } from 'react';
import { Form, FormControl, Glyphicon, Button } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, onClose, onCancel, okDisabled, onKeyDown } = this.props;
        return (
            <div ref={node => this.node = node}>
                <Form inline>
                    <FormControl
                        style={{ maxWidth: '5em', marginRight: '20px' }}
                        type="number"
                        value={value}
                        onChange={e => this.handleChange(e.target.value)}
                        onKeyDown={e => onKeyDown(e)}
                        ref={(input) => this.numberInput = input} />
                    <Button bsClass="btn btn-xs btn-success muted" onClick={() => onClose()} disabled={okDisabled()}><Glyphicon glyph="saved" /></Button>
                </Form>
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

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.props.onCancel();
    };
}