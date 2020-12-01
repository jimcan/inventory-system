import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

export default function CustomSelect({
  name, value, label, error, onChange, options
}) {
  return (
    <FormControl
      variant='outlined'
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value=''>None</MenuItem>
        {
          options.map(item => (
            <MenuItem
              key={item.id}
              value={item.id}
            >{item.title}</MenuItem>
          ))
        }
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
