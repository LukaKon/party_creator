import React, { useState } from "react";
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

const getStyle = (category, categoryName, theme) => {
  return {
    fontWeight:
      categoryName.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const SelectCategory = (props) => {

  // console.log('props in select: ',props)

  const theme = useTheme()
  const [categoryName, setCategoryName] = useState([])

  const handleChange = e => {
    e.preventDefault()
    const { target: { value }, } = e
    setCategoryName(
      typeof value === 'string' ? value.split('.') : value
    )
    if (typeof props.selectedCategory === 'function') {
      console.log('cat in if: ', categoryName)
      props.selectedCategory(categoryName)
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='category-label'>Category</InputLabel>
        <Select
          labelId="category-label"
          id='category'
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
