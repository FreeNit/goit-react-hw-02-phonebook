import { Component } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { TitleMain, TitleContacts } from './App.styled';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({
        contacts: JSON.parse(localContacts),
      });
    }
  }

  // -> update local storage and state
  componentDidUpdate(prevProps, prevState) {
    // if (this.props.contacts.length !== prevProps.contacts.length) {
    //   this.setState({
    //     contacts: this.props.contacts,
    //   });
    // }

    if (this.state.contacts && prevState.contacts) {
      if (prevState.contacts.length !== this.state.contacts.length) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }
  }

  updateContactList = contact => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  checkUserAvailability = userName => {
    return this.state.contacts.find(contact => contact.name === userName);
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div>
          <TitleMain>Phonebook</TitleMain>
          <ContactForm
            updateContactList={this.updateContactList}
            checkUserAvailability={this.checkUserAvailability}
            NotificationManager={NotificationManager}
          />
        </div>
        {this.state.contacts.length > 0 && (
          <div>
            <TitleContacts>Contacts</TitleContacts>
            <Filter
              filterValue={this.state.filter}
              handleFilter={this.handleFilter}
            />
            <ContactList
              filter={this.state.filter}
              contacts={this.state.contacts}
              deleteContact={this.deleteContact}
            />
          </div>
        )}

        <NotificationContainer />
        <GlobalStyle />
      </div>
    );
  }
}
