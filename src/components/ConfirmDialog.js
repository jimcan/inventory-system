import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { Cancel, Delete } from '@material-ui/icons'
import React from 'react'

export default function ConfirmDialog({
  confirmDialog, setConfirmDialog
}) {
  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      onKeyDown={e => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') confirmDialog.onConfirm()
        else if (e.code === 'Escape') setConfirmDialog({ ...confirmDialog, isOpen: false })
      }}
    >
      <DialogTitle>
        <Typography variant='h6'>
          {confirmDialog.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='subtitle2'>
          {confirmDialog.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions>
        <IconButton
          color='default'
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          <Cancel />
        </IconButton>
        <IconButton
          color='secondary'
          onClick={() => confirmDialog.onConfirm()}
        >
          <Delete color='secondary' />
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}
