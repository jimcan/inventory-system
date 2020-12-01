import { ThemeProvider, createMuiTheme, CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react'
import SideMenu from './SideMenu';
import Header from './Header'
import Employees from './pages/employees/Employees'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  shape: {
    borderRadius: '10px'
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '200px',
    width: '100%'
  }
})

export default function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}
