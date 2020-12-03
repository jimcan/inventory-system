import { AppBar, Grid, IconButton, InputBase, Badge, Toolbar, makeStyles } from '@material-ui/core'
import { ChatBubbleOutline, NotificationsNone, PowerSettingsNew, Search } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee'
  },
  searchInput: {
    opacity: '0.6',
    padding: '0px 8px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }
  }
})

export default function Appbar() {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <InputBase
              placeholder='Search'
              startAdornment={<Search fontSize='small' />}
              className={classes.searchInput}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsNone fontSize='small' />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color='primary'>
                <ChatBubbleOutline fontSize='small' />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNew />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
