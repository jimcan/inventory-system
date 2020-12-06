import { AppBar, Grid, Toolbar, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#eee'
  },
  searchInput: {
    opacity: '0.6',
    padding: '0px 8px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#aaa'
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }
  },
  title: {
    fontWeight: 'bold',
    color: '#253053'
  },
  page: {
    fontWeight: 'bold',
    color: '#455073'
  }
}))

export default function Header({ pageTitle }) {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <Typography
              variant='h5'
              className={classes.title}
            >
              R & C POS and Inventory System
            </Typography>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Typography
              variant='h6'
              className={classes.page}
            >
              { pageTitle }
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
