import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './config/routes.tsx'

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root')!)
root.render(
  <ThemeProvider>
    {/* <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> */}
    <RouterProvider router={router} />
  </ThemeProvider>
)

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */
