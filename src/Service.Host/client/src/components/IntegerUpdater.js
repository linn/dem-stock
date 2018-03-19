import React, { Component } from 'react'
import { Grid, Row, Col, Button, Modal, FormGroup, FormControl, InputGroup  } from 'react-bootstrap';
import { IntegerInput } from './common/IntegerInput'

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

export class IntegerUpdater extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false,
            currentValue: props.value
        };
    }

    handleClick() {
        this.setState({ currentValue: this.props.value });
        this.setState({ isOpen: true });
    }

    handleClose() {
        this.setState({ isOpen: false });
    }

    handleChanged(value) {        
        this.setState({ currentValue: value });
    }

    handleOkClick() {
        this.setState({ isOpen: false });
        this.props.onChange(this.state.currentValue);
    }

    handleKeyPress(e) {
        if (!this.saveDisabled() && e.key === 'Enter') {            
            this.handleOkClick();
        }
        else if (e.key === 'Escape') {
            this.handleClose();
        }
    }

    saveDisabled() {
        const { required = false } = this.props;
        if (required && !this.state.currentValue && this.state.currentValue !== 0) {
            return true;
        }

        return false;
    }

    render() {
        const { value, displayOnly } = this.props;
        return (
            <div>
                {this.state.isOpen 
                    ? <IntegerInput value={this.state.currentValue} validationCondition={null} onChange={value => this.handleChanged(value)}
                            onCancel={() => this.handleClose()}
                            onClose={() => this.handleOkClick()} 
                            okDisabled={() => this.saveDisabled()} 
                            onKeyDown={(e) => this.handleKeyPress(e)} />
                : displayOnly
                    ? value
                        : <Button bsStyle="link" style={styles.button} onClick={() => this.handleClick()}>{value}</Button>
                }
            
            </div>
        );
    }
}

export default IntegerUpdater;
