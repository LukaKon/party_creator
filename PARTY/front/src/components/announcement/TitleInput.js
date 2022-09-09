import React from "react";
import { useInput } from './hooks/useInput'
import { TextField } from '@mui/material'

export const TitleInput = (props) => {

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(value => value.trim() !== '', '')

  console.log('Title reset: ',props.reset)
  if (props.reset) {
    console.log('reset?: ',props.reset)
    resetTitleInput()

  }

  //TODO: return entered value and if it is Valid

  return (
    <>
      <TextField
        margin='normal'
        required
        id='title'
        label='Tytuł'
        name='title'
        // defaultValue='Tytuł'
        value={enteredTitle}
        onChange={titleChangedHandler}
        onBlur={titleBlurHandler}
        error={titleInputHasError}
      />
    {titleInputHasError && (<p style={{ color: 'red' }}>Tytuł nie może zostać pusty.</p>)}
  </>
  )
}