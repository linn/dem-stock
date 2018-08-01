import React, { Component } from 'react';
import { FormGroup, FormControl, ListGroup, InputGroup, ListGroupItem, Label, Checkbox } from 'react-bootstrap';
import { Loading } from './common';

class RootProductSearchTypeahead extends Component {
    render() {
        const { rootProducts, loading, searchTerm, includePhasedOut, setRootProductSearchTerm, setIncludePhasedOut, handleClick } = this.props;

        return (
            <React.Fragment>
                <FormGroup>
                    <InputGroup style={{ display: 'inline-block' }}>
                        <FormControl  autoFocus value={searchTerm} onChange={e => setRootProductSearchTerm(e.target.value)} type="text" placeholder="Enter root product name" ></FormControl>
                        
                    </InputGroup>
                    <Checkbox style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '10px' }} checked={includePhasedOut} onChange={e => setIncludePhasedOut(e.target.checked)}>Include Phased Out</Checkbox>
                </FormGroup>
                <div>
                    {rootProducts.length > 0
                        ? (
                            <ListGroup>
                                {rootProducts.map((product, i) => (
                                    <ListGroupItem key={i} onClick={() => handleClick(product)}>
                                        <b>{product.name}</b> : {product.description} {product.phasedOutOn ? (<Label bsStyle="danger">Phased Out</Label>) : ''}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )
                        : loading
                            ? <Loading />
                            : <span>{searchTerm ? 'No matching root products' : ''}</span>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default RootProductSearchTypeahead;