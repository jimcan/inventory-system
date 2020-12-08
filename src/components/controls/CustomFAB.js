import { Fab, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  fab: {
    textTransform: 'uppercase',
    padding: '20px'
  }
})

export default function CustomFAB({
  text, color, size, variant, children, ...other
}) {
  const classes = useStyles()

  return (
    <Fab
      size={size || 'small'}
      variant={variant || 'extended'}
      color={color || 'defaut'}
      className={classes.fab}
      {...other}
    >
      {children}
      {text && text}
    </Fab>
  )
}
