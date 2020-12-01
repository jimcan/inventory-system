import React, { useEffect, useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import useTable from '../../useTable';
// import { getEmployees } from '../../../services/employeeServices'
import { firestore } from '../../../firebase/config'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

export default function Employees() {
  const classes = useStyles()
  const { TblContainer } = useTable()
  const [records, setRecords] = useState([])

  function getEmployees() {
    let employees = []
    firestore.collection('employees')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          employees.push(doc.data())
        })
      })
    setRecords(employees)
  }

  useEffect(() => {
    getEmployees()
  })

  return (
    <>
      <PageHeader
        title='Page Header'
        subtitle='Page description'
        icon={<PeopleOutlineTwoTone fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <TblContainer>
          <TableBody>
            {
              records.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
      </Paper>

    </>
  )
}
