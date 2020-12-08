import { ThemeProvider, createMuiTheme, CssBaseline, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu';
import Header from './Header'
import LogIn from './LogIn';
import Transactions from './Transactions';
import Admin from './admin/Admin';

const theme = createMuiTheme({
  shape: {
    borderRadius: '10px'
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    width: '80%',
    height: '100%',
    position: 'fixed',
    right: '0',
    top: '0'
  }
})

const pages = ['Admin Dashboard', 'Transactions']
const AdminPages = ['Manage Products', 'Manage Staffs', 'Sales']

export default function App() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [adminPage, setAdminPage] = useState(0)
  const [user, setUser] = useState(null)

  const renderPages = () => {
    switch (page) {
      case 0:
        return <Admin adminPage={adminPage} />

      case 1:
        return <Transactions />

      default:
        break
    }
  }

  useEffect(() => {
    if (user && user.username === 'admin') setPage(0)
    else setPage(1)
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      {
        user
          ? <div>
            <SideMenu
              user={user}
              setUser={setUser}
              {...(page === 0 && { adminPages: AdminPages })}
              {...(page === 0 && { adminPage: adminPage })}
              {...(page === 0 && { setAdminPage: setAdminPage })}
            />
            <div className={classes.appMain}>
              <Header pageTitle={pages[page]} />
              {renderPages()}
            </div>
          </div>
          : <LogIn
            user={user}
            setUser={setUser}
          />
      }

      <CssBaseline />
    </ThemeProvider>
  );
}
