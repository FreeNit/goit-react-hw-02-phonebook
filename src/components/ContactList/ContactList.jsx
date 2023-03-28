import { ListOfContacts, ListItem, ListItemButton } from './ContactList.styled';

export const ContactList = ({ filter, contacts, deleteContact }) => {
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
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
  );
};
