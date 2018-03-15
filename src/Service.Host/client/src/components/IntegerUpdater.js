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

    handleOKClick() {
        this.setState({ isOpen: false });
        this.props.onChange(this.state.currentValue);
    }

    saveDisabled() {
        const { required = false } = this.props;
        if (required && !this.state.currentValue && this.state.currentValue !== 0) {
            return true;
        }

        return false;
    }

    render() {
        const { title, value, displayOnly } = this.props;
        return (
            <div>
                {displayOnly
                    ? value
                    : <Button bsStyle="link" style={styles.button} onClick={() => this.handleClick()}>{value}</Button>
                }
                <Modal show={this.state.isOpen} onExited={() => this.handleClose()} onHide={() => this.handleClose()} >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ overflowY: 'scroll', maxHeight: '80vh', minHeight: '50px' }}>
                        <IntegerInput value={this.state.currentValue} validationCondition={null} onChange={value => this.handleChanged(value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleClose()}>Close</Button>
                        <Button bsStyle="primary" onClick={() => this.handleOKClick()} disabled={this.saveDisabled()}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default IntegerUpdater;
