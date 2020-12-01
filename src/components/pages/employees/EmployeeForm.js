import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Controls } from '../../controls/Controls'
import { useForm, Form } from '../../useForm'
import * as employeeService from '../../../services/employeeServices'
import useTable from '../../useTable'

const initialValues = {
  id: 0,
  fullname: '',
  email: '',
  mobile: '',
  gender: 'male',
  city: '',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false
}

const genderItems = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'other', name: 'Other' }
]

export default function EmployeeForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullname' in fieldValues)
      temp.fullname = fieldValues.fullname ? '' : 'This field is required'
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? '' : 'Email is not valid'
    if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Not a valid contact number'
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length != 0 ? '' : 'This field is required'
    setErrors({ ...temp })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == '')
  }

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = useForm(initialValues, true, validate)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      employeeService.addEmployee(values)
      resetForm()
    }
  }

  useEffect(() => {

  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.CustomInput
            label='Full Name'
            name='fullname'
            value={values.fullname}
            onChange={handleInputChange}
            error={errors.fullname}
          />
          <Controls.CustomInput
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.CustomInput
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.CustomInput
            label='City'
            name='city'
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.CustomRadioGroup
            row
            name='gender'
            label='Gender'
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.CustomSelect
            name='departmentId'
            label='Department'
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.CustomDatePicker
            name='hireDate'
            label='Date Hired'
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.CustomCheckbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.CustomButton
              type='submit'
              text='Submit'
            />
            <Controls.CustomButton
              color='default'
              text='Reset'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
