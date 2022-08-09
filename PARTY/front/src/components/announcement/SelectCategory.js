import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles'
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'
import { useInput } from "./hooks/useInput";

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

const getStyle = (category, categoryName, theme) => {
  return {
    fontWeight:
      categoryName.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const SelectCategory = (props) => {

  const theme = useTheme()
  const [categoryName, setCategoryName] = useState([])

  const {
    value: selectedCategory,
    isValid: selectedCategoryValid,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,//will be different
  } = useInput(value => value.length !== 0)

  const handleChange = e => {
    e.preventDefault()
    const value=e.target.value

    // console.log('value: ',e )

    setCategoryName(
      typeof value === 'string' ? value.split('.') : value
    )
  }

  useEffect(() => {
    if (typeof props.selectedCategory === 'function') {
      // console.log('cat in if: ', categoryName)
      props.selectedCategory(categoryName)
    }
  }, [categoryName])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='category-label'>Category</InputLabel>
        <Select
    margin='normal'
          labelId="category-label"
          id='category'
    required
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput label='Cat' />}
          MenuProps={MenuProps}
        >
          {props.categories.map(category => (
            <MenuItem
              key={category.uuid}
              value={category.name}
              style={getStyle(category.name, categoryName, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
