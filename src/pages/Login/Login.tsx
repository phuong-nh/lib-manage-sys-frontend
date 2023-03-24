import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../features/users/slice'
import { User } from '../../types'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { AuthenticationForm } from '../../components/AuthenticationForm'
import { Box, Container } from '@mantine/core'
import { Navigate } from 'react-router'

const Login = () => {
  const currentUser = useSelector((state: any) => state.users.currentUser)

  return (
    <Box sx={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {currentUser && <Navigate to="/" />}
      <Container size="xs">
        <AuthenticationForm />
        <Box sx={{height: "20vh"}}/>
      </Container>
    </Box>
  )
}

export default Login
