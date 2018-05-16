import React, { Component } from 'react';
import { Form, FormControl, Glyphicon, Button } from 'react-bootstrap';

export class IntegerInput extends Component {

    render() {
        const { value, onClose, onCancel, okDisabled, onKeyDown } = this.props;
        return (
            <div ref={node => this.node = node}>
                <input
                    style={{ maxWidth: '5em', marginRight: '20px' }}
                    type="text"
                    pattern="\d*"
                    value={value}
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={e => onKeyDown(e)}
                    ref={(input) => this.numberInput = input} />
                <Button bsClass="btn btn-xs btn-success muted" onClick={() => onClose()} disabled={okDisabled()}><Glyphicon glyph="saved" /></Button>
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
        this.numberInput.focus();
        this.numberInput.setSelectionRange(0, this.numberInput.value.length);

        document.addEventListener('click', this.handleDocumentClick);

        if ('ontouchstart' in document.documentElement) {
            document.body.style.cursor = 'pointer';
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);

        if ('ontouchstart' in document.documentElement) {
            document.body.style.cursor = null;
        }
    }

    handleDocumentClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.props.onCancel();
    };
}