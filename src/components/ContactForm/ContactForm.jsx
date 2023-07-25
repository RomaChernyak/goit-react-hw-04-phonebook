import { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

export const ContactForm = ({ addContact }) => {
    const [name, getName] = useState('');
    const [number, getNumber] = useState('');

    const handleForm = evt => {
        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        evt.preventDefault();

        addContact(newContact);

        evt.target.reset();
    };

    const handleChange = ({ currentTarget: { name, value } }) => {
        switch (name) {
            case 'name':
                return getName(value);
            case 'number':
                return getNumber(value);
            default:
                return;
        }
    };

    return ( 
        <form
            className={css.phonebook__form}
            name="phonebook_form"
            autoComplete="on"
            onSubmit={handleForm}
        >
            <label
                className={css.phonebook__label}
            >
                Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                />
            </label>

            <label
                className={css.phonebook__label}
            >
                Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                />
            </label>

            <button
                type="submit"
                className={css.phonebook__add}
            >
                Add contact
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};