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

const getStyle = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const SelectCategory = ({ categories, selectCategoryCallBack }) => {
  const theme = useTheme()
  const [categoryName, setCategoryName] = useState([])

  const handleChange = e => {
    const { target: { value }, } = e
    setCategoryName(
      typeof value === 'string' ? value.split('.') : value
    )
    if (typeof selectCategoryCallBack==='function'){
      selectCategoryCallBack(categoryName)
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
          {categories.map(category => (
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
