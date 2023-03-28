import { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  checkUserAvailability = (userName, listOfContacts) => {
    return listOfContacts.find(contact => contact.name === userName);
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number, contacts } = this.state;

    const isUserAvailable = this.checkUserAvailability(name, contacts);

    if (isUserAvailable) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));

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

  handleFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();

    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

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
        {/* // ! Component */}
        <h3>Phonebook</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
        {/* // ! Component */}
        <h3>Contacts</h3>
        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          value={this.state.filter}
          onChange={this.handleFilter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Filter may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <ul>
          {visibleContacts.map(({ id, name, number }) => {
            return (
              <li key={id}>
                {name}: {number}{' '}
                <button
                  onClick={() => {
                    this.deleteContact(id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
