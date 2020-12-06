import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

export default function CustomNotification({
    notify, setNotify
}) {
    const classes = useStyles()

    const handleClose = (_, reason) => {
        if (reason === 'clickAway') return
        setNotify({ ...notify, isOpen: false })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: "right"
            }}
            >
            <Alert
                severity={notify.type}
                onClose={handleClose}
            >
                { notify.message }
            </Alert>
        </Snackbar>
    )
}
