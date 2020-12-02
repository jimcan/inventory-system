import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { Controls } from './controls/Controls'

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        padding: 0
    },
    dialogTitleDiv: {
        display: 'flex',
        alignItems: 'center'
    },
    dialogTitleText: {
        flexGrow: 1
    },
}))

export default function Popup({
    title,
    children,
    openPopup,
    setOpenPopup,
    setRecordForEdit
}) {
    const classes = useStyles()
    
    const onClose = () => {
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    return (
        <Dialog
            open={openPopup}
            classes={{paper: classes.dialogWrapper}}
            onClose={onClose}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div className={classes.dialogTitleDiv}>
                    <Typography
                        variant='h6'
                        component='div'
                        className={classes.dialogTitleText}
                    >
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color='secondary'
                        onClick={onClose}
                    >
                        <Close />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                { children }
            </DialogContent>
        </Dialog>
    )
}
