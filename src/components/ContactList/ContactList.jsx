import { Component } from 'react';
import { ListOfContacts, ListItem, ListItemButton } from './ContactList.styled';

export class ContactList extends Component {
  state = {
    contacts: null,
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({
        contacts: JSON.parse(localContacts),
      });
    }
  }

  render() {
    const { filter, contacts, deleteContact } = this.props;
    const normalizedFilter = filter.toLowerCase();
    // const visibleContacts = contacts.filter(contact =>
    //   contact.name.toLowerCase().includes(normalizedFilter)
    // );
    const visibleContacts = this.state.contacts
      ? this.state.contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : null;

    return (
      visibleContacts && (
        <div>
          <ListOfContacts>
            {visibleContacts.map(({ id, name, number }) => {
              return (
                <ListItem key={id}>
                  {name}: {number}{' '}
                  <ListItemButton
                    onClick={() => {
                      deleteContact(id);
                    }}
                  >
                    Delete
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ListOfContacts>
        </div>
      )
    );
  }
}
