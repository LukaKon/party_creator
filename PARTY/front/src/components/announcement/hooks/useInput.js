import { useState } from 'react'

export const useInput = (validateValue,initState) => {
	const [enteredValue, setEnteredValue] = useState(initState)
	const [isTouched, setIsTouched] = useState(false)

	const valueIsValid = validateValue(enteredValue)
	const hasError = !valueIsValid && isTouched

	const valueChangeHandler = e => {
		setEnteredValue(e.target.value)
	}

	const inputBlurHandler = e => {
		setIsTouched(true)
	}

	const reset = () => {
		setEnteredValue(initState)
		// setIsTouched(false)
	}

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset
	}
}
