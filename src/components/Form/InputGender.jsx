import React from 'react';

const InputGender = ({onInputChange}) => {

    return (
        <div className='gender-block-wrapper'>
            <label htmlFor="male">Gender:</label>

            <div className="gender-block"  onChange={onInputChange}>
                <input type="radio" id="male" name="drone" value="Male" defaultChecked/>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="drone" value="Female"/>
                <label htmlFor="female">Female</label>
            </div>
        </div>
    );
};

export default InputGender;