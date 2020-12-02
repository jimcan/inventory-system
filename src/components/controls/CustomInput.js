import { TextField } from '@material-ui/core'
import React from 'react'

export default function CustomInput({
  name, label, value, onChange, error, ...other
}) {
  return (
    <TextField
      variant='outlined'
      margin='dense'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
