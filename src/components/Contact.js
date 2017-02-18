import React, {Component} from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey : -1,
            keyword: '',
            contact : [
                {name:'이동주', phone:'010-6718-2013'},
                {name:'홍길동', phone:'123-1234-1234'},
                {name:'강감찬', phone:'222-333-4444'},
                {name:'이순신', phone:'111-6656-4547'}
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        let contact = localStorage.contact;
        if (contact) {
            this.setState({
                contact: JSON.parse(contact)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contact) != JSON.stringify(this.state.contact)) {
            localStorage.contact = JSON.stringify(this.state.contact);
        }
    }

    handleChange(e) {
        this.setState({
            keyword : e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        })
    }

    handleCreate(contact) {
        this.setState({
            contact: update(this.state.contact, {$push: [contact]})
        })
    }

    handleRemove() {
        if(this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            contact: update(this.state.contact, {
                $splice: [[this.state.selectedKey, 1]]
            })
        })

        this.state.selectedKey = -1;
    }

    handleEdit(name, phone) {
        if(this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            contact: update(this.state.contact, {
                [this.state.selectedKey]: {
                    name: {$set: name},
                    phone: {$set: phone}
                }
            })
        })
    }

    render() {
        const mapToContact = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.indexOf(this.state.keyword.trim()) > -1;
                }
            );
            return data.map((contact, i)=> {
                return (
                    <ContactInfo
                        contact={contact}
                        key={i}
                        onClick={()=>{this.handleClick(i)}}
                    />
                )
            })
        }

        return (
            <div>
                <h1>Contact List</h1>
                <input type="search" name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} />
                <div>{mapToContact(this.state.contact)}</div>
                <ContactDetails 
                    isSelected={this.state.selectedKey>=0}
                    contact={this.state.contact[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}