import React, {Component} from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

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

        console.log(key, 'is selected');
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
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={()=>{this.handleClick(i)}}/>)
            })
        }

        return (
            <ul>
                <h1>Contact List</h1>
                <input type="search" name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} />
                <div>{mapToContact(this.state.contact)}</div>
                <ContactDetails contact={this.state.contact[this.state.selectedKey]}/>
            </ul>
        )
    }
}