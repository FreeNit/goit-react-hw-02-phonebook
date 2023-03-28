export const ContactList = ({ filter, contacts }) => {
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
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
};
