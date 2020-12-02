import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main
        },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main
        },
    }
}))

export default function ActionButton({
    color, children, onClick
}) {
    const classes = useStyles()

    return (
        <Button
            onClick={onClick}
            className={`${classes.root} ${classes[color]}`}
        >
            { children }
        </Button>
    )
}
