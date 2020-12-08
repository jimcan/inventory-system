import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore';

export default function CustomSelect({
  name, value, label, error, onChange
}) {

  const [open, setOpen] = React.useState(false);
  const [depts, setDepts] = useState([])
  const [newDept, setNewDept] = useState('')

  const { filteredDocs } = useFirestore('staffs')

  useEffect(() => {
    let d = []
    filteredDocs.forEach(i => {
      if (!d.includes(i.position))
        d.push(i.position)
    })
    setDepts(d)
  }, [filteredDocs])

  const handleAdd = e => {
    e.preventDefault()
    if (!depts.includes(newDept)) {
      setDepts([...depts, newDept])
    }
    setOpen(false);
  }

  return (
    <>
      <FormControl
        variant='outlined'
        {...(error && { error: true })}
      >
        <TextField
          margin='dense'
          variant='outlined'
          id='select'
          label={label}
          name={name}
          select
          fullWidth
          value={value}
          onChange={onChange}
        >
          <MenuItem value='' onClick={() => setOpen(true)}>
            New
          </MenuItem>
          {
            depts.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
              >{item}</MenuItem>
            ))
          }
        </TextField>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add new position</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Position"
            type="text"
            variant='outlined'
            onChange={e => setNewDept(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
