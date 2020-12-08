import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import { AddOutlined, ClearAllOutlined, Close, DeleteOutlined, UpdateOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Controls } from '../components/controls/Controls'

const useStyles = makeStyles({
  dialogTitleDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export function useDialogForm(
  initialValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    if (validateOnChange) {
      validate({ [name]: value })
    }
  }

  const clearFields = () => {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    clearFields
  }
}

export function DialogForm({
  title,
  setRecordForEdit,
  openDialogForm,
  setOpenDialogForm,
  handleSubmit,
  handleDelete,
  clearFields,
  children
}) {
  const classes = useStyles()
  const onClose = (_, __) => {
    clearFields()
    setOpenDialogForm(false)
    setRecordForEdit(null)
  }

  return (
    <Dialog
      open={openDialogForm}
      onClose={onClose}
    >
      <DialogTitle>
        <div className={classes.dialogTitleDiv}>
          <Typography
            variant='h6'
            component='div'
          >
            {title ? `Edit ${title}` : 'Add new'}
          </Typography>
          <IconButton
            onClick={onClose}
            color='secondary'
            size='small'
          >
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Controls.CustomFAB
          text='Clear'
          onClick={clearFields}
        >
          <ClearAllOutlined size='small' />
        </Controls.CustomFAB>
        {
          title && <Controls.CustomFAB
            text='Delete'
            color='secondary'
            onClick={handleDelete}
          >
            <DeleteOutlined size='small' />
          </Controls.CustomFAB>
        }
        <Controls.CustomFAB
          text={title ? 'Update' : 'Add'}
          color='primary'
          onClick={handleSubmit}
        >
          {
            title
              ? <UpdateOutlined size='small' />
              : <AddOutlined size='small' />
          }
        </Controls.CustomFAB>
      </DialogActions>
    </Dialog>
  )

}
