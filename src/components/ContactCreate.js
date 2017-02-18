import React, {Component} from 'react';

export default class ContactCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        let nextState = {}
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); 
    }

    handleClick() {
        let contact = {
            name: this.state.name.trim(),
            phone: this.state.phone.trim()
        }
        if (contact.name && contact.phone) {
            this.props.onCreate(contact);
            this.setState({
                name: '',
                phone: ''
            })
        }
    }
    
    render() {
        return (
            <div>
                <h1>Contact Create</h1>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>create Contact</button>
            </div>
        )
    }
}

ContactCreate.propTypes = {
    onCreate: React.PropTypes.func
}

ContactCreate.defaultProps = {
    onCreate: () => {console.error('onCreate is not defined.')}
}