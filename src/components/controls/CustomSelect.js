import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore';

export default function CustomSelect({
  name, value, label, error, onChange
}) {

  const [open, setOpen] = React.useState(false);
  const [depts, setDepts] = useState([])
  const [newDept, setNewDept] = useState('')

  const { docs } = useFirestore('employees')

  useEffect(() => {
    let d = []
    docs.forEach(i => {
      if (!d.includes(i.department))
        d.push(i.department)
    })
    setDepts(d)
  }, [docs])

  const handleAdd = () => {
    if (!depts.includes(newDept))
      setDepts([...depts, newDept])
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
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Department"
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
