import { Component } from 'react';
import { nanoid } from 'nanoid';

import {
  FormWrapper,
  PhonebookForm,
  FormLabel,
  FormInput,
  AddContactBtn,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // -> Add contact to Local Storage
  updateAddToLocalStorage = contact => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      const newContacts = [...localContacts, contact];
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    } else {
      const newContacts = [contact];
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { updateContactList, checkUserAvailability, NotificationManager } =
      this.props;
    const { name, number } = this.state;

    const isUserAvailable = checkUserAvailability(name);

    if (isUserAvailable) {
      NotificationManager.warning(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.updateAddToLocalStorage(contact);

    updateContactList(contact);

    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = evt => {
    switch (evt.target.name) {
      case 'name':
        this.setState({ name: evt.target.value });
        break;
      case 'number':
        this.setState({ number: evt.target.value });
        break;
      default:
        console.log('Sorry, this element is not under control');
    }
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    return (
      <FormWrapper>
        <PhonebookForm onSubmit={this.handleSubmit}>
          <FormLabel>
            Name
            <FormInput
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </FormLabel>
          <FormLabel>
            Number
            <FormInput
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </FormLabel>
          <AddContactBtn type="submit">Add contact</AddContactBtn>
        </PhonebookForm>
      </FormWrapper>
    );
  }
}
