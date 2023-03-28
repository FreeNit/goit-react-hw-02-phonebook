import { Component } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { TitleMain, TitleContacts } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  updateContactList = contact => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  checkUserAvailability = userName => {
    return this.state.contacts.find(contact => contact.name === userName);
  };

  handleFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  deleteContact = id => {
    console.log(id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
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
          />
        </div>

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

        <GlobalStyle />
      </div>
    );
  }
}
