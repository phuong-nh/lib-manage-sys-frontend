import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Box, Button, MantineProvider } from '@mantine/core'
import libraryTheme from './constant/theme'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/Error/NotFound'
import Login from './pages/Login/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <Login />
  }
])

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="907337911907-7gmbteqb7mirlhoor3ch3nlhsi6qhp59.apps.googleusercontent.com">
        <MantineProvider theme={libraryTheme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default App
