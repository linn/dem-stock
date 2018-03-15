import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export class OkModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, isOpen, handleCancel, handleOk } = this.props;

        return (
            <Modal show={isOpen} onExited={() => handleCancel()} onHide={() => handleCancel()} >
                 <Modal.Header closeButton>
                     <Modal.Title>{title}</Modal.Title>
                 </Modal.Header>
                 <Modal.Footer>
                     <Button onClick={() => handleCancel()}>Cancel</Button>
                     <Button bsStyle="primary" onClick={() => handleOk()}>OK</Button>
                 </Modal.Footer>
             </Modal>
        );
    }
}