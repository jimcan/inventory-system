import { makeStyles } from '@material-ui/core';
import React from 'react';
import Products from './products/Products';
import Sales from './sales/Sales';
import Staffs from './staffs/Staffs';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px'
  }
}))

export default function Admin({ adminPage }) {
  const classes = useStyles()

  const renderPage = () => {
    switch (adminPage) {
      case 0:
        return <Products />
    
      case 1:
        return <Staffs />
    
      case 2:
        return <Sales />
    
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      { renderPage() }
    </div>
  );
}
