import { useState } from "react";

export const useInput = (validateValue, initState) => {
  const [enteredValue, setEnteredValue] = useState(initState);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    console.log("event: ", typeof event);
    try {
      setEnteredValue(event.target.value);
    } catch {
      setEnteredValue(event);
    }
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue(initState);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
