import React from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import useTable from '../../../hooks/useTable';
import { useFirestore } from '../../../hooks/useFirestore';


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    overflowX: 'hidden',
  }
}))

const headCells = [
  { id: 'fullname', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department', disableSorting: true }
]

export default function Employees() {
  const classes = useStyles()
  const { docs } = useFirestore('employees')
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterSortingAndPaging
  } = useTable(docs, headCells)

  return (
    <>
      <PageHeader
        title='Page Header'
        subtitle='Page description'
        icon={<PeopleOutlineTwoTone fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
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
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

    </>
  )
}
