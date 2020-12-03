import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh - ${theme.spacing(48)}px)`,
    overflow: 'auto'
  },
  table: {
    // marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: '#eee',
      position: 'sticky',
      top: 0
    },
    '& tbody td': {
      fontWeight: '300'
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}))

export default function useTable(
  records,
  headCells,
  filterFn
) {
  const classes = useStyles()

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const TblContainer = props => (
    <div className={classes.root}>
      <Table className={classes.table} size='small' dense table>
        {props.children}
      </Table>
    </div>
  )

  const TblHead = props => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map(head => (
              <TableCell
                key={head.id}
                sortDirection={orderBy === head.id ? order : false}
              >
                {
                  head.disableSorting ? head.label :
                    <TableSortLabel
                      active={orderBy === head.id}
                      direction={orderBy === head.id ? order : 'asc'}
                      onClick={() => { handleSortRequest(head.id) }}
                    >
                      {head.label}
                    </TableSortLabel>
                }
              </TableCell>
            ))
          }
        </TableRow>

      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const recordsAfterSortingAndPaging = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy))
      .slice(
        page * rowsPerPage, (page + 1) * rowsPerPage
      )
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1
    if (b[orderBy] > a[orderBy]) return 1
    return 0
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterSortingAndPaging
  }
}
