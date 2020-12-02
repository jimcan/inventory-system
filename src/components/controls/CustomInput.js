import { TextField } from '@material-ui/core'
import React from 'react'

export default function CustomInput({
  name, label, value, onChange, error = null
}) {
  return (
    <TextField
      variant='outlined'
      margin='dense'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  )
}
