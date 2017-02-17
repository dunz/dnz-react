import React , {Component} from 'react';

export default class ContactDetails extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Details</h1>
                <div>{this.props.contact.name} {this.props.contact.phone}</div>
            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name : '',
        phone: ''
    }
}