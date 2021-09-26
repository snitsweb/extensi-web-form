import React from 'react';

const InputText = ({id, name, title, placeholder, required, isTextInputValid, textInputValue, onTextInputChange, context}) => {

    return (
        <div className={isTextInputValid ? 'text-input' : 'text-input invalid'}>
            <label htmlFor={id}>{title}:</label>
            <input required={!!required}
                   className='textInput'
                   name={name}
                   id={id}
                   type="text"
                   placeholder={placeholder && placeholder}
                   value={textInputValue}
                   onChange={(e)=>onTextInputChange(e, context)}
            />
            <p>Warning: this field's length must be minimum 3 charaсters</p>
        </div>
    );
};

export default InputText;