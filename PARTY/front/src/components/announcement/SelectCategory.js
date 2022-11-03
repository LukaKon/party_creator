import React, { useEffect } from "react";
import { useTheme } from '@mui/material/styles'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
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

const getStyle = (category, selectedCategory, theme) => {
  return {
    fontWeight:
      selectedCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const SelectCategory = (props) => {

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: selectedCategoryChangedHandler,
    inputBlurHandler: selectedCategoryBlurHandler,
    reset: resetSelectedCategory,
  } = useInput(value => value.length > 0, [])

  const theme = useTheme()
  // TODO: reset category field to init state
  // console.log('reset?: ',props.reset)
  // if (props.reset){
  // resetSelectedCategory()
  // }

  useEffect(() => {
    if (typeof props.selectedCategory === 'function') {
      props.selectedCategory(selectedCategory)
    }
    if (typeof props.categoryIsValid === 'function') {
      props.categoryIsValid(selectedCategoryIsValid)
    }
  }, [selectedCategory, selectedCategoryIsValid])

  return (
    <Grid item>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='category-label'>Category</InputLabel>
        <Select
          labelId="category-label"
          id='category'
          required
          multiple
          value={selectedCategory}
          onChange={selectedCategoryChangedHandler}
          onBlur={selectedCategoryBlurHandler}
          error={selectedCategoryHasError}
          input={<OutlinedInput label='Cat' />}
          MenuProps={MenuProps}
        >
          {props.categories.map(category => (
            <MenuItem
              key={category.uuid}
              value={category.uuid}
              style={getStyle(category.get_name, selectedCategory, theme)}
            >
              {category.get_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategoryHasError && (<p style={{ color: "red" }}>Category must be selected.</p>)}
    </Grid>
  )
}
