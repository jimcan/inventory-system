import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'

export default function CustomRadioGroup({
  name, label, value, onChange, items
}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          items.map((item, index) => (
            <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.name} />
          ))
        }
      </RadioGroup>
    </FormControl>
  )
}
