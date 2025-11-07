import { createBrowserRouter, RouterProvider } from 'react-router'
import Homepage from './pages/Homepage'
import Login from './pages/Movies'
import Favourites from './pages/Favourites'
import Search from './pages/Search'
import Tv from './pages/Tv'
import Errorpage from './pages/ErrorPage'
import Layout from './Layouts/Layout'

export default function App() {
  return (<>
    <RouterProvider router={router} />
    <Layout />
  </>);
}

const router = createBrowserRouter([
  { path: '/', Component: Homepage },
  { path: '/movies', Component: Login },
  { path: '/favourites', Component: Favourites },
  { path: '/tv', Component: Tv },
  { path: '/search', Component: Search },
  { path: '*', Component: Errorpage },
])