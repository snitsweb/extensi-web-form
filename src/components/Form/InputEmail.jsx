import React from 'react';

const InputEmail = ({id, name, title, placeholder, required,
                        emailValue, isEmailValid,
                        emailCheckDone, onEmailChange
                    }) => {

    return (
        <div className={!isEmailValid ? 'text-input invalid' : 'text-input loading'}>
            <label htmlFor={id}>{title}:</label>
            <div className="inputWrapper">
                <input required={!!required}
                       className='textInput'
                       name={name}
                       id={id}
                       type="text"
                       placeholder={placeholder && placeholder}
                       value={emailValue}
                       onChange={onEmailChange}
                />
                {!emailCheckDone && <div className="windows8">
                    <div className="wBall" id="wBall_1">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_2">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_3">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_4">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall" id="wBall_5">
                        <div className="wInnerBall"></div>
                    </div>
                </div>}
            </div>

            <p>Warning: email isn't correct </p>

        </div>
    );
};

export default InputEmail;