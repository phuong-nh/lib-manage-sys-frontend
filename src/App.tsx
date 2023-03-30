import { MantineProvider } from '@mantine/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ModalsProvider } from '@mantine/modals'

import libraryTheme from './constant/theme'
import Home from './pages/Home/Home'
import NotFound from './pages/Error/NotFound'
import Login from './pages/Login/Login'
import Search from './pages/Search/Search'
import { HeaderResponsive } from './components/HeaderResponsive'
import headerLinks from './utils/headerLinks'
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/Admin'
import ContentPost from './pages/Content/ContentPost'
import './App.css'

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
        },
        {
          path: '/admin',
          element: <Admin />
        },
        {
          path: '/content/:id',
          element: <ContentPost />
        }
      ]
    }
  ])

  return (
    <GoogleOAuthProvider clientId="907337911907-7gmbteqb7mirlhoor3ch3nlhsi6qhp59.apps.googleusercontent.com">
      <MantineProvider theme={libraryTheme}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
  )
}

export default App
