import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import RootProductSearchTypeahead from './RootProductSearchTypeahead';

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
        const { visible, rootProducts, loading, searchTerm, setRootProductSearchTerm, setIncludePhasedOut } = this.props;

        return (
            <Modal show={visible} onExited={() => setRootProductSearchTerm(null)} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Root Product</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: 'scroll', maxHeight: '80vh', minHeight: '220px' }}>
                    <RootProductSearchTypeahead
                        rootProducts={rootProducts}
                        loading={loading}
                        searchTerm={searchTerm}
                        setRootProductSearchTerm={setRootProductSearchTerm}
                        setIncludePhasedOut={setIncludePhasedOut}
                        handleClick={(product) => this.handleProductClick(product)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RootProductSearch;