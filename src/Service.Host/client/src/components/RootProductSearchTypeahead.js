import React, { Component } from 'react';
import { FormGroup, FormControl, ListGroup, InputGroup, ListGroupItem } from 'react-bootstrap';
import { Loading } from './common';

class RootProductSearchTypeahead extends Component {
    render() {
        const { rootProducts, loading, searchTerm, setRootProductSearchTerm, handleClick } = this.props;

        return (
            <React.Fragment>
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
                                    <ListGroupItem key={i} onClick={() => handleClick(product)}>
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
            </React.Fragment>
        );
    }
}

export default RootProductSearchTypeahead;