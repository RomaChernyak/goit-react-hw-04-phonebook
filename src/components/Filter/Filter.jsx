import PropTypes from "prop-types";
import css from "./Filter.module.css";

export const Filter = ({ handleSearch }) => {
    return ( 
        <label className={css.phonebook__search}>
            Find contact by name:
            <input
                type="text"
                name="filter"
                onChange={handleSearch}
            />
        </label>
    );
};

Filter.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};