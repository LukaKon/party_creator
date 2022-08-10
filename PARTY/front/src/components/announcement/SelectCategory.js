import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles'
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const getStyle = (category, selectedCategory, theme) => {
  return {
    fontWeight:
      selectedCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const SelectCategory = (props) => {

  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState([])
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = selectedCategory.length > 0
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = e => {
    const value = e.target.value

    setSelectedCategory(
      typeof value === 'string' ? value.split('.') : value
    )
  }

  const inputBlurHandler = e => {
    setIsTouched(true)
  }

  useEffect(() => {
    if (typeof props.selectedCategory === 'function') {
      // console.log('cat in if: ', selectedCategory)
      props.selectedCategory(selectedCategory)
    }
    if (typeof props.categoryIsValid=== 'function') {
      // console.log('is cat valid in component: ', valueIsValid)
      props.categoryIsValid(valueIsValid)
    }
  }, [selectedCategory, valueIsValid])

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='category-label'>Category</InputLabel>
        <Select
          margin='normal'
          labelId="category-label"
          id='category'
          required
          multiple
          value={selectedCategory}
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
          error={hasError}
          input={<OutlinedInput label='Cat' />}
          MenuProps={MenuProps}
        >
          {props.categories.map(category => (
            <MenuItem
              key={category.uuid}
              value={category.name}
              style={getStyle(category.name, selectedCategory, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {hasError && (<p style={{ color: "red" }}>Category must be selected.</p>)}
    </>
  )
}
