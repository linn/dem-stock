import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Modal, ListGroup, DropdownButton, Dropdown, MenuItem, InputGroup, ListGroupItem, Label, OverlayTrigger, Popover, Checkbox, Alert } from 'react-bootstrap';
import { Loading } from './common';

class RootProductSearch extends Component {
    handleProductClick(product) {
        const { onSelect, hideRootProductSearch } = this.props;

        hideRootProductSearch();
        onSelect(product.href);
    }

    handleClose() {
        this.props.hideRootProductSearch();
    }

    render() {
        const { visible, rootProducts, loading, searchTerm, setRootProductSearchTerm } = this.props;

        return (
            <Modal show={visible} onExited={() => setRootProductSearchTerm(null)} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Root Product</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: 'scroll', maxHeight: '80vh', minHeight: '220px' }}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl autoFocus value={searchTerm} onChange={e => setRootProductSearchTerm(e.target.value)} type="text" placeholder="Enter root product name" ></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <div>
                        {rootProducts.length > 0
                            ? (
                                <ListGroup>
                                    {rootProducts.map((product, i) => (
                                        <ListGroupItem key={i} onClick={() => this.handleProductClick(product)}>
                                            <b>{product.name}</b> : {product.description}
                                        </ListGroupItem>
                                    ))}                                    
                                </ListGroup>
                            )
                            : loading
                                ? <Loading />
                                : <span>{searchTerm ? 'No matching root products' : ''}</span>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RootProductSearch;