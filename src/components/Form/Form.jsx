import React from 'react';
import InputGender from "./InputGender";
import InputDate from "./InputDate";
import axios from "axios";
import InputEmail from "./InputEmail";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const Form = (props) => {
    //email states
    const [emailValue, setEmailValue] = React.useState("")
    const [isEmailValid, setIsEmailValid] = React.useState(false)
    const [emailCheckDone, setEmailCheckDone] = React.useState(true)

    //name states
    const [nameValue, setNameValue] = React.useState("")
    const [isNameValid, setIsNameValid] = React.useState(false)

    //surname states
    const [surnameValue, setSurnameValue] = React.useState("")
    const [isSurnameValid, setIsSurnameValid] = React.useState(true)

    //date states
    const [dateValue, setDateValue] = React.useState(`${year}-${month}-${day}`)
    const [isDateValid, setIsDateValid] = React.useState(true)

    //gender state
    const [genderValue, setGenderValue] = React.useState("Male")

    //button state
    const [isButtonAvailable, setIsButtonAvailable] = React.useState(false)

    const onTextInputChange = (e, context) => {
        context === 'name' && setNameValue(e.target.value)
        context === 'surname' && setSurnameValue(e.target.value)

        if (e.target.value.length >= 3) {
            if(context === 'name'){
                setIsNameValid(true)
                checkButtonReady(isDateValid, isSurnameValid, true, isEmailValid)
            } else if (context === 'surname') {
                setIsSurnameValid(true)
                checkButtonReady(isDateValid, true, isNameValid, isEmailValid)
            }
        } else if(e.target.value.length === 0 && context === "surname"){
            setIsSurnameValid(true)
            checkButtonReady(isDateValid, true, isNameValid, isEmailValid)
        } else {
            context === 'name' && setIsNameValid(false)
            context === 'surname' && setIsSurnameValid(false)
            checkButtonReady(isDateValid, false, false, isEmailValid)
        }
    }

    const getEmailValidatorAnswer = (email) => {
        const res = axios.get(`/api/email-validator.php?email=${email}`).then(({data}) => {
            setEmailCheckDone(true)
            return data.validation_status
        })
        return res
    }

    const onEmailChange = async (e) => {
        setEmailValue(e.target.value)
        if (e.target.value !== '') {
            setEmailCheckDone(false)
            const isEmailValid = await getEmailValidatorAnswer(e.target.value)
            setIsEmailValid(isEmailValid)
            checkButtonReady(isDateValid, isSurnameValid, isNameValid, isEmailValid)
        } else {
            setEmailCheckDone(true)
        }
    }

    const checkDate = (date) => {
        const arrUserDate = date.split('-');
        const valid = parseInt(year + "" + month + day) >= parseInt(arrUserDate[0] + arrUserDate[1] + arrUserDate[2])
        return valid
    }

    const onDateChange = (e) => {
        const isDateValid = checkDate(e.target.value)
        setIsDateValid(isDateValid)
        setDateValue(e.target.value)
        checkButtonReady(isDateValid, isSurnameValid, isNameValid, isEmailValid)
    }

    const onGenderChange = (e) => {
        setGenderValue(e.target.value)
    }

    const checkButtonReady = (isDateValid, isSurnameValid, isNameValid, isEmailValid) => {
        if(isDateValid && isSurnameValid && isNameValid && isEmailValid){
            setIsButtonAvailable(true)
        } else {
            setIsButtonAvailable(false)
        }
        console.log(isDateValid,  isSurnameValid , isNameValid , isEmailValid)
    }

    const onButtonClick = () => {
        alert(JSON.stringify({name: nameValue, surname: surnameValue, date: dateValue, email: emailValue, gender: genderValue}))
    }

    return (
        <form>
            <InputText required
                       name={'name'}
                       id={'name'}
                       title={'Name'}
                       placeholder={'Oleksandr'}
                       onTextInputChange={onTextInputChange}
                       context={'name'}
                       isTextInputValid={isNameValid}
                       textInputValue={nameValue}
            />
            <InputText name={'surname'}
                       id={'surname'}
                       title={'Surname'}
                       placeholder={'Snitsaruk'}
                       onTextInputChange={onTextInputChange}
                       context={'surname'}
                       isTextInputValid={isSurnameValid}
                       textInputValue={surnameValue}
            />

            <InputEmail required
                        name={'email'}
                        id={'email'}
                        title={'Email'}
                        placeholder={'oleksnitsaruk@gmail.com'}
                        emailValue={emailValue}
                        isEmailValid={isEmailValid}
                        emailCheckDone={emailCheckDone}
                        onEmailChange={onEmailChange}
            />

            <InputDate
                name={'birth_date'}
                id={'birth_date'}
                title={'Birth date'}
                placeholder={'29.02.2002'}
                onInputChange={onDateChange}
                dateValue={dateValue}
                isDateValid={isDateValid}
            />
            <InputGender onInputChange={onGenderChange}/>

            <SubmitButton isButtonAvailable={isButtonAvailable} onButtonClick={onButtonClick}/>
        </form>
    );
};

export default Form;