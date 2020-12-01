import { FormControl, Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react'

export default function CustomCheckbox({
  name, label, value, onChange
}) {
  const converToDefaultEventParam = (name, value) => ({
    target: { name, value }
  })

  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox
          name={name}
          color='primary'
          checked={value}
          onChange={e => onChange(converToDefaultEventParam(name, e.target.checked))}
        />}
        label={label}
      />
    </FormControl>
  )
}
