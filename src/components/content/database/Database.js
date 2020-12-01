import { makeStyles } from '@material-ui/core'
import React from 'react'
import Header from '../../Header'
import SideMenu from '../../SideMenu'

const useStyle = makeStyles({
  appMain: {
    paddingLeft: '200px',
    width: '100%'
  }
})

export default function Database() {
  const classes = useStyle()

  return (
    <>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
      </div>
    </>
  )
}
