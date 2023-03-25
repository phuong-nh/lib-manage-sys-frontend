import store from './store'
import { MantineProvider } from '@mantine/core'
import libraryTheme from './constant/theme'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/Error/NotFound'
import Login from './pages/Login/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Search from './pages/Search/Search'
import { HeaderResponsive } from './components/HeaderResponsive'
import headerLinks from './utils/headerLinks'
import Profile from './pages/Profile/Profile'

const App = () => {
  const links = headerLinks()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HeaderResponsive links={links} />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    }
  ])

  return (
    <GoogleOAuthProvider clientId="907337911907-7gmbteqb7mirlhoor3ch3nlhsi6qhp59.apps.googleusercontent.com">
      <MantineProvider theme={libraryTheme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </GoogleOAuthProvider>
  )
}

export default App
