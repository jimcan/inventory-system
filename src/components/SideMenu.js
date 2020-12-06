import { Avatar, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Controls } from './controls/Controls'

const useStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: '0px',
    width: '20%',
    height: '100%',
    backgroundColor: '#253053',
    padding: '10px'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '150px',
    backgroundColor: '#455073',
    marginBottom: '20px',
    padding: '10px'
  },
  navContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  footerP: {
    margin: 0,
    padding: 0,
    textAlign: 'center'
  }
})

export default function SideMenu({
  user, setUser, adminPage, setAdminPage, adminPages
}) {
  const classes = useStyles()
  return (
    <div className={classes.sideMenu}>
      <Paper className={classes.profileContainer}>
        <Avatar >{user.username.substring(0, 1).toUpperCase()}</Avatar>
        <Typography variant='subtitle2'>{user.username}</Typography>
        <Typography variant='subtitle2'>{user.position}</Typography>
        <Controls.CustomButton
          variant='outlined'
          text='Log out'
          color='secondary'
          onClick={() => setUser(null)}
        />
      </Paper>
      <div className={classes.navContainer}>
        {
          adminPages && adminPages.map((pp, i) => (
            <Controls.CustomButton
              key={i}
              text={pp}
              size='large'
              {...(adminPage) !== i && { variant: 'outlined' }}
              onClick={() => setAdminPage(i)}
            />
          ))
        }
      </div>
      <div>
        <p className={classes.footerP}>&copy; jiMcaN</p>
        <p className={classes.footerP}>jimcan009@gmail.com</p>
        <p className={classes.footerP}>09557262636</p>
      </div>      
    </div>
  )
}
