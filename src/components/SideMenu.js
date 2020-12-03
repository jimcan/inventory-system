import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: '0px',
    width: '20%',
    height: '100%',
    backgroundColor: '#253053'
  }
})

export default function SideMenu() {
  const classes = useStyles()
  return (
    <div className={classes.sideMenu}>

    </div>
  )
}
