import React, { useEffect, useState } from 'react';
import {
  Button, IconButton, InputAdornment, makeStyles, Paper, TextField
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { addData, deleteData, updateData, useFirestore } from '../../../hooks/useFirestore';
import { Add, Remove, Search } from '@material-ui/icons';
import ProductForm from './ProductForm';
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
  name: '', unit: '', price: '', stock: ''
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    hide: 'true'
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 4
  },
  {
    field: 'unit',
    headerName: 'Unit',
    flex: 2
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    flex: 2
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    flex: 2
  }
];

export default function Products() {
  const classes = useStyles()
  const { docs } = useFirestore('products')
  const [openProductForm, setOpenProductForm] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false })
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({})
  const [filterFn, setFilterFn] = useState({ fn: items => items })
  const [searchValue, setSearchValue] = useState('')

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required'
    if ('unit' in fieldValues)
      temp.unit = fieldValues.unit ? '' : 'This field is required'
    if ('price' in fieldValues)
      temp.price = !isNaN(fieldValues.price) ? '' : 'Must be number'
    if ('stock' in fieldValues)
      temp.stock = !isNaN(fieldValues.stock) ? '' : 'Must be number'
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
              x => x.name.toLowerCase().includes(e.target.value)
            )
      }
    })
  }

  const handleSearchClear = () => {
    setSearchValue('')
    setFilterFn({fn: items => items})
  }

  const addOrEdit = (product, clearFields) => {
    if (product.id == null) {
      addData('products', product)
      setNotify({
        isOpen: true,
        message: 'Added Succesfully',
        type: 'success'
      })
    }
    else {
      updateData('products', product)
      setNotify({
        isOpen: true,
        message: 'Updated Succesfully',
        type: 'success'
      })
    }
    clearFields()
    setRecordForEdit(null)
    setOpenProductForm(false)
  }

  const onRowClick = params => {
    const id = params.getValue('id')
    const product = docs.find(d => d.id === id)
    setRecordForEdit(product)
    setOpenProductForm(true)
  }

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this item?',
      subtitle: "You can't undo this process",
      onConfirm: () => {
        deleteData('products', recordForEdit.id)
        setRecordForEdit(null)
        setConfirmDialog({ isOpen: false })
        setOpenProductForm(false)
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
          label='Search product'
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
          onClick={() => setOpenProductForm(true)}
        >
          <Add size='small' />
          Add new product
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
        title={recordForEdit ? recordForEdit.name : null}
        openDialogForm={openProductForm}
        setOpenDialogForm={setOpenProductForm}
        setRecordForEdit={setRecordForEdit}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        clearFields={clearFields}
      >
        <ProductForm
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
