import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";
// import interfaceInfo from "../../backend/interfaceInfo.json";

export class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    handleChange = evt => {
        const { name, value } = evt.currentTarget;

        this.setState({
            [name]: value,
        });
    };

    handleForm = evt => {
        const { name, number } = this.state;
        const { handleAddContact } = this.props;

        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        evt.preventDefault();

        handleAddContact(newContact);

        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: ''
        });
    };

    // capitalizeFirstLetter = string => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // };

    render() {
        // const data = interfaceInfo;

        return ( 
            <form
                className={css.phonebook__form}
                name="phonebook_form"
                autoComplete="on"
                onSubmit={this.handleForm}
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
                        onChange={this.handleChange}
                        value={this.state.name}
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
                        onChange={this.handleChange}
                        value={this.state.number}
                    />
                </label>

                {/* Можна ще так динамічно зарендерити два інпути, щоб  не передавати всі атрибути, але не продумав до кінця як задати динамічно значення атрибуту value, тому поки що просто задокументував */}
                {/* {data.map(({ type, name, pattern, title }, index) => (
                    <label
                        key={index}
                        className={css.phonebook_label}
                    >
                        {this.capitalizeFirstLetter(name)}
                        <input
                            type={type}
                            name={name}
                            pattern={pattern}
                            title={title}
                            required
                            onChange={this.handleChange}
                            value={this.state[{fieldName}.value]}
                        />
                    </label>
                ))} */}

                <button
                    type="submit"
                    className={css.phonebook__add}
                >
                    Add contact
                </button>
            </form>
        );
    };
};

ContactForm.propTypes = {
    handleAddContact: PropTypes.func.isRequired,
};