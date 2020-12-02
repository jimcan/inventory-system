import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}))

export function useForm(
  initialValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleInputChange(e) {
    // e.preventDefault()
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    if (validateOnChange) {
      validate({ [name]: value })
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  }
}

export function Form({ children, ...other }) {
  const classes = useStyles()

  return (
    <form
      className={classes.root}
      autoComplete='off'
      {...other}
    >
      {children}
    </form>
  )
}
