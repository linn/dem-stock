import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import { OkModal } from './common/OkModal';

export class RemoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleClick() {
        this.setState({ isOpen: true });
    }

    handleCancel() {
        this.setState({ isOpen: false });
    }

    handleOk() {
        this.setState({ isOpen: false });
        this.props.onConfirm();
    }    

    render() {
        const { title } = this.props;
        return (
            <div>
                <Button bsClass="btn btn-xs btn-danger muted" onClick={() => this.handleClick()}>
                    <Glyphicon glyph="remove" />
                </Button>

                <OkModal title={title} isOpen={this.state.isOpen} handleCancel={() => this.handleCancel()} handleOk={() => this.handleOk()} />
            </div>
        );
    }
}

export default RemoveItem;
