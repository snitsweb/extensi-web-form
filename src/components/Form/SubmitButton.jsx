import React from 'react';

const SubmitButton = ({isButtonAvailable, onButtonClick}) => {
    return (
        <button className={isButtonAvailable ? 'submit-button' : 'submit-button disable'} onClick={onButtonClick}>
            Submit
        </button>
    );
};

export default SubmitButton;