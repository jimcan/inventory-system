import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'
import { Controls } from './controls/Controls'

export default function ConfirmDialog({
    color, confirmDialog, setConfirmDialog
}) {
    return (
        <Dialog
            open={confirmDialog.isOpen}
            onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
            <DialogTitle>
                <Typography variant='h6'>
                    { confirmDialog.title }
                </Typography>
            </DialogTitle>
            <DialogContent>                
                <Typography variant='subtitle2'>
                    { confirmDialog.subtitle }
                </Typography>
            </DialogContent>
            <DialogActions>
                <Controls.CustomButton
                    text='No'
                    color='default'
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <Controls.CustomButton
                    text='Yes'
                    color='secondary'
                    onClick={() => confirmDialog.onConfirm()}
                />
            </DialogActions>
        </Dialog>
    )
}
