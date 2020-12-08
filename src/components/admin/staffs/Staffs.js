import React, { useEffect, useState } from 'react';
import {
  IconButton, InputAdornment, makeStyles, Paper, TextField
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useFirestore } from '../../../hooks/useFirestore';
import { Add, Remove, Search } from '@material-ui/icons';
import StaffForm from './StaffForm';
import CustomNotification from '../../CustomNotification';
import { DialogForm, useDialogForm } from '../../../hooks/useDialogForm';
import ConfirmDialog from '../../ConfirmDialog';
import { Controls } from '../../controls/Controls';

const useStyles = makeStyles({
  content: {
    padding: '10px',
    height: 'calc(100vh - 188px)',
    backgroundColor: '#ccc'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    padding: '20px'
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
  const [openStaffForm, setOpenStaffForm] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false })
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const {
    filteredDocs,
    filterDocuments,
    addDocument,
    updateDocument,
    deleteDocument
  } = useFirestore('staffs')

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
    filterDocuments(searchValue, 'name')
  }

  const handleSearchClear = () => {
    setSearchValue('')
    filterDocuments(searchValue, 'name')
  }

  const addOrEdit = (staff, clearFields) => {
    if (staff.id) {
      updateDocument(staff)
      setNotify({
        isOpen: true,
        message: 'Updated Succesfully',
        type: 'success'
      })
    }
    else {
      addDocument(staff)
      setNotify({
        isOpen: true,
        message: 'Added Succesfully',
        type: 'success'
      })
    }
    clearFields()
    setRecordForEdit(null)
    setOpenStaffForm(false)
  }

  const onRowClick = params => {
    const id = params.getValue('id')
    const staff = filteredDocs.find(d => d.id === id)
    setRecordForEdit(staff)
    setOpenStaffForm(true)
  }

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this item?',
      subtitle: "You can't undo this process",
      onConfirm: () => {
        deleteDocument(recordForEdit.id)
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
        <Controls.CustomFAB
          text='Add new staff'
          color="primary"
          size='large'
          onClick={() => setOpenStaffForm(true)}
        >
          <Add size='small' />
        </Controls.CustomFAB>
      </div>
      <Paper className={classes.content}>
        <DataGrid
          className={classes.table}
          rows={filteredDocs}
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
