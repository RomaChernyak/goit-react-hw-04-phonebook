import React, { Component } from "react";
import Notiflix from "notiflix";
import { ContactForm, ContactList, Filter, defaultContacts } from "components";

export class App extends Component {
  state = {
    contacts: [...defaultContacts],

    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate(_, prevState) {
    // console.log(prevState);
    // console.log(this.state);

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  };

  handleSearch = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;
    
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  handleDeleteContact = contactId => {
    const { contacts } = this.state;

    this.setState({ contacts: contacts.filter(({ id }) => id !== contactId) });
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
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
      this.setState({
        contacts: [...contacts, contact],
      });

      Notiflix.Notify.success('Success! New contact was added!');
    }
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          handleAddContact={this.handleAddContact}
        />
        <h2>Contacts</h2>
        <Filter
          handleSearch={this.handleSearch}
        />
        <ContactList
          contacts={this.handleFilter()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
};