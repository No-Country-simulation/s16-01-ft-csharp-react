import { Navigate } from 'react-router-dom'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'
import PreferencePage from '../pages/PreferencePage'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import MenuPage from '../pages/MenuPage'
import Appp from '../pages/Appp'
import ConsumptionPage from '../pages/ConsumptionPage'
import ExpensePage from '../pages/ExpensePage'
import ProductPage from '../pages/ProductPage'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/about' /> },
      { path: '/',element: <Appp />, children: [
        { path: '/home', element: <HomePage /> },
        { path: '/menu', element: <MenuPage /> },
        { path: '/consumption', element: <ConsumptionPage /> },
        { path: '/expenses', element: <ExpensePage /> },
        { path: '/product/:id', element: <ProductPage /> },
      ] },
      { path: '/about', element: <AboutPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/preference', element: <PreferencePage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
]

export default routes
