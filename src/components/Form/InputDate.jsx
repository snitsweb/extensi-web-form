import React from 'react';

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const InputDate = ({id, name, title, placeholder, required, onInputChange, isDateValid, dateValue}) => {

    return (
        <div className={ !isDateValid ? 'date-input invalid' : 'date-input'}>
            <label htmlFor={id}>{title}:</label>
            <input required={!!required}
                   className='textInput'
                   name={name}
                   id={id}
                   type="date"
                   placeholder={placeholder && placeholder}
                   value={dateValue}
                   onChange={onInputChange}
            />
            <p>{`Warning: date cannot be greater than ${day}.${month}.${year}`} </p>
        </div>
    );
};

export default InputDate;