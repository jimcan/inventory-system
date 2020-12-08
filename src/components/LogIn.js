import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDialogForm } from '../hooks/useDialogForm';
import { useFirestore } from '../hooks/useFirestore';
import { Controls } from './controls/Controls'
import CustomNotification from './CustomNotification';

const initialValues = { username: '', password: '' }

export default function LogIn({
  user, setUser
}) {
  const [notify, setNotify] = useState({ isOpen: false })
  const { filteredDocs } = useFirestore('staffs')

  const {
    values,
    handleInputChange
  } = useDialogForm(initialValues)

  const handleSignIn = e => {
    e.preventDefault()
    // auth.signInWithEmailAndPassword(values.userName, values.password)
    // .then((user) => {
    //   setUser({
    //     name: 'Jimboy Cantila',
    //     email: user.user.email,
    //     position: 'Admin',
    //     avatar: 'JC'
    //   })
    // })
    // .catch((error) => {
    //   setNotify({
    //     isOpen: true,
    //     message: error.message,
    //     type: 'error'
    //   })
    // });
    const loggedUser = filteredDocs
      .find(d => d.username === values.username && d.password === values.password)
    if (loggedUser) {
      setUser(loggedUser)
    } else {
      setNotify({
        isOpen: true,
        message: 'Invalid username/password!',
        type: 'error'
      })
    }
  }


  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#55a0c3',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h5' style={{ padding: '50px' }}>
          Welcome to R & C Trading POS and Inventory System!
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
          <Controls.CustomInput
            label='Username'
            autoFocus
            name='username'
            value={values.username}
            onChange={handleInputChange}
          />
          <Controls.CustomInput
            label='Password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSignIn(e)
            }}
          />
          <Controls.CustomButton
            text='Log in'
            size='large'
            onClick={handleSignIn}
          />
        </div>
      </div>
      <CustomNotification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  )
}
