import { Navigate } from 'react-router-dom'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'
import PreferencePage from '../pages/PreferencePage'
import DashboardPage from '../pages/DashboardPage'
import HomePage from '../pages/HomePage'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/home' replace={true} /> },
      { path: '/dashboard', element: <DashboardPage />, Children: [] },
      { path: '/home', element: <HomePage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/preference', element: <PreferencePage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  
]

export default routes
