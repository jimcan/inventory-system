import React, { useEffect, useState } from 'react';
import {
  Button, IconButton, InputAdornment, makeStyles, Paper, TextField
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { addData, deleteData, updateData, useFirestore } from '../../../hooks/useFirestore';
import { Add, Remove, Search } from '@material-ui/icons';
import StaffForm from './StaffForm';
import CustomNotification from '../../CustomNotification';
import { DialogForm, useDialogForm } from '../../../hooks/useDialogForm';
import ConfirmDialog from '../../ConfirmDialog';

const useStyles = makeStyles({
  content: {
    padding: '10px',
    height: 'calc(100vh - 188px)',
    backgroundColor: '#ccc'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    padding: '20px'
  },
  spacer: {
    flexGrow: 1
  },
  table: {
    backgroundColor: '#aaa',
  }
})

const initialValues = {
  username: '', password: '', fullname: '', position: ''
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    hide: 'true'
  },
  {
    field: 'username',
    headerName: 'Username',
    flex: 2
  },
  {
    field: 'fullname',
    headerName: 'Full Name',
    flex: 4
  },
  {
    field: 'position',
    headerName: 'Position',
    flex: 2
  }
];

export default function Staffs() {
  const classes = useStyles()
  const { docs } = useFirestore('staffs')
  const [openStaffForm, setOpenStaffForm] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false })
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({})
  const [filterFn, setFilterFn] = useState({ fn: items => items })
  const [searchValue, setSearchValue] = useState('')

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? '' : 'This field is required'
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length > 3 ? '' : 'At least 4 characters'
    if ('fullname' in fieldValues)
      temp.fullname = fieldValues.fullname ? '' : 'This field is required'
    if ('position' in fieldValues)
      temp.position = fieldValues.position ? '' : 'This field is required'
    setErrors({ ...temp })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === '')
  }  

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    clearFields
  } = useDialogForm(
    initialValues, true, validate
  )

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({ ...recordForEdit })
  }, [recordForEdit, setValues])

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      addOrEdit(values, clearFields)
    }
  }

  const handleSearch = e => {
    setSearchValue(e.target.value)
    setFilterFn({
      fn: items => {
        if (e.target.value === '')
          return items
        else
          return items
            .filter(
              x => x.username.toLowerCase().includes(e.target.value) ||
                x.fullname.toLowerCase().includes(e.target.value)
            )
      }
    })
  }

  const handleSearchClear = () => {
    setSearchValue('')
    setFilterFn({fn: items => items})
  }

  const addOrEdit = (staff, clearFields) => {
    if (staff.id == null) {
      addData('staffs', staff)
      setNotify({
        isOpen: true,
        message: 'Added Succesfully',
        type: 'success'
      })
    }
    else {
      updateData('staffs', staff)
      setNotify({
        isOpen: true,
        message: 'Updated Succesfully',
        type: 'success'
      })
    }
    clearFields()
    setRecordForEdit(null)
    setOpenStaffForm(false)
  }

  const onRowClick = params => {
    const id = params.getValue('id')
    const staff = docs.find(d => d.id === id)
    setRecordForEdit(staff)
    setOpenStaffForm(true)
  }

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this item?',
      subtitle: "You can't undo this process",
      onConfirm: () => {
        deleteData('staffs', recordForEdit.id)
        setRecordForEdit(null)
        setConfirmDialog({ isOpen: false })
        setOpenStaffForm(false)
        setNotify({
          isOpen: true,
          message: 'Deleted Succesfully',
          type: 'error'
        })
      }
    })
    
  }

  return (
    <>
      <div className={classes.toolbar}>
        <TextField
          variant='outlined'
          margin='dense'
          label='Search Staff'
          value={searchValue}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchValue !== '' && (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  onClick={handleSearchClear}
                >
                  <Remove size='small' />
                </IconButton>                  
              </InputAdornment>
            )
          }}
        />
        <div className={classes.spacer}></div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenStaffForm(true)}
        >
          <Add size='small' />
          Add new staff
        </Button>
      </div>
      <Paper className={classes.content}>
        <DataGrid
          className={classes.table}
          rows={filterFn.fn(docs)}
          columns={columns}
          autoPageSize
          onRowClick={onRowClick}
        />
      </Paper>
      <DialogForm
        title={recordForEdit ? recordForEdit.username : null}
        openDialogForm={openStaffForm}
        setOpenDialogForm={setOpenStaffForm}
        setRecordForEdit={setRecordForEdit}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        clearFields={clearFields}
      >
        <StaffForm
          values={values}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </DialogForm>
      <CustomNotification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
