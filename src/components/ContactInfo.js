import React, {Component} from 'react';

export default class ContactInfo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.contact.name} {this.props.contact.phone}</div>
)
    }
}