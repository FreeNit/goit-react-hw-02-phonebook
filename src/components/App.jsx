import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

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

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          updateContactList={this.updateContactList}
          checkUserAvailability={this.checkUserAvailability}
        />

        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          handleFilter={this.handleFilter}
        />
        <ContactList
          filter={this.state.filter}
          contacts={this.state.contacts}
        />
      </div>
    );
  }
}
