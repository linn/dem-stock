import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import RetailerSearch from '../containers/RetailerSearch';

class App extends Component {
    render() {
        return (
            <Grid fluid={false}>
                <Row>
                    <Col xs={12}>
                        <RetailerSearch />
                    </Col>
                </Row >
            </Grid >
        );
    }
}

export default App;