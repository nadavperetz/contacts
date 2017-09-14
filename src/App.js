import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsApi from './utils/ContactsApi'

class App extends Component {


    state = {
        screen: 'list',
        contacts: []
    };

    componentDidMount() {
        ContactsApi.getAll().then((contacts) => {
                this.setState({contacts: contacts})
            }
        )
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));
        ContactsApi.remove(contact);

    };

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <ListContacts onDeleteContact={this.removeContact}
                                  contacts={this.state.contacts}
                    />)
                }/>

                <Route path="/create" component={CreateContact}/>

            </div>)
    }
}

export default App;
