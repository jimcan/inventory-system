import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

export default function CustomDatePicker({
  name, label, value, onChange
}) {
  const converToDefaultEventParam = (name, value) => ({
    target: { name, value }
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        margin='dense'
        inputVariant='outlined'
        label={label}
        format='MMM/dd/yyyy'
        name={name}
        value={value}
        onChange={date => onChange(converToDefaultEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  )
}
