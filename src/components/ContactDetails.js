import React , {Component} from 'react';

export default class ContactDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: '',
            phone: '',
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleToggle() {
        if (!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            console.log(this.state)
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit 
        })
        console.log(this.state.isEdit);
    }

    handleChange(e) {
        let nextState = {}
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); 
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    render() {
        const details = (<div>{this.props.contact.name} {this.props.contact.phone}</div>);
        const edit = (
            <div>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                </p>
            </div>
        )
        const view = this.state.isEdit ? edit : details;

        return (
            <div>
                <h1>Contact Details</h1>
                <div>{this.props.isSelected ? view : <div></div>}</div>
                <div>
                    <button onClick={this.handleToggle}>edit</button>
                    <button onClick={this.props.onRemove}>remove</button>
                </div>
            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name : '',
        phone: ''
    },
    onRemove: () => {console.error('onRemove not defined.')},
    onEdit: () => {console.error('onEdit not defined.')}
}

ContactDetails.propTypes = {
    contact: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    onEdit: React.PropTypes.func
}



