import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import { ContactForm, ContactList, Filter, defaultContacts } from "components";

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) ?? defaultContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSearch = ({ currentTarget: { value } }) => setFilter(value);

  const handleAddContact = contact => {
    const isContactExisted = contacts.find(({ name, number }) => {
      const normalizedItemName = name.toLowerCase().trim().replace(/\s+/g, " ");
      const normalizedSearchedName = contact.name.toLowerCase().trim().replace(/\s+/g, " ");
      const normalizedItemNumber = number.toLowerCase().trim().replace(/\s+/g, "").replaceAll("-", "");
      const normalizedSearchedNumber = contact.number.toLowerCase().trim().replace(/\s+/g, "").replace("-", "");

      return (normalizedItemNumber === normalizedSearchedNumber) ||
        (normalizedItemName === normalizedSearchedName);
    });
    
    if (isContactExisted) {
      return Notiflix.Notify.failure(`${contact.name} already exists in your contact list.`);
    } else {
      setContacts([...contacts, contact]);
      Notiflix.Notify.success('Success! New contact was added!');
    }
  };

  const handleFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = contactId => {
    setContacts([...contacts.filter(({ id }) => id !== contactId)]);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm
        addContact={handleAddContact}
      />
      <h2>Contacts</h2>
      <Filter
        handleSearch={handleSearch}
      />
      <ContactList
        contacts={handleFilter()}
        deleteContact={handleDeleteContact}
      />
    </>
  );
};