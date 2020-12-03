import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../PageHeader';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core'
import { Add, Close, EditOutlined, PeopleOutlineTwoTone, Search } from '@material-ui/icons';
import useTable from '../../../hooks/useTable';
import { useFirestore } from '../../../hooks/useFirestore';
import { Controls } from '../../controls/Controls'
import Popup from '../../Popup';
import * as employeeService from '../../../services/employeeServices'
import Notification from '../../Notification';
import ConfirmDialog from '../../ConfirmDialog';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: 'calc(100vh - 235px)'
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))

const headCells = [
  { id: 'fullname', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [notify, setNotify] = useState({
    isOpen: false, message: '', type: ''
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false, title: '', subtitle: ''
  })
  const { docs } = useFirestore('employees')
  const [filterFn, setFilterFn] = useState({
    fn: items => items
  })
  const [open, setOpen] = useState(false)
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterSortingAndPaging
  } = useTable(docs, headCells, filterFn)

  const handleSearch = e => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '')
          return items
        else
          return items
            .filter(
              x => x.fullname.toLowerCase().includes(target.value)
            )
      }
    })
  }

  const addOrEdit = (employee, resetForm) => {
    if (employee.id == null) {
      employeeService.addEmployee(employee)
      console.log('add');
      setNotify({
        isOpen: true,
        message: 'Added Succesfully',
        type: 'success'
      })
    }
    else {
      employeeService.updateEmployee(employee)
      setNotify({
        isOpen: true,
        message: 'Updated Succesfully',
        type: 'success'
      })
    }
    resetForm()
    setRecordForEdit(null)
    setOpen(false)
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpen(true)
  }

  const onDelete = id => {
    employeeService.deleteEmployee(id)
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
    setConfirmDialog({ isOpen: false })
  }

  return (
    <>
      <PageHeader
        title='Page Header'
        subtitle='Page description'
        icon={<PeopleOutlineTwoTone fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.CustomInput
            label='Search Employees'
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
          />
          <Controls.CustomButton
            text='Add New'
            variant='outlined'
            className={classes.newButton}
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterSortingAndPaging().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color='primary'
                      onClick={() => {
                        openInPopup(item)
                      }}
                    >
                      <EditOutlined fontSize='small' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color='secondary'
                      onClick={() => setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subtitle: "You can't undo this operation",
                        onConfirm: () => onDelete(item.id)
                      })}
                    >
                      <Close fontSize='small' />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Employee Form'
        openPopup={open}
        setOpenPopup={setOpen}
        setRecordForEdit={setRecordForEdit}
      >
        <EmployeeForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
