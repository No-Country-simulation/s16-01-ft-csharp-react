import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './config/routes.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root')!)
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
)

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */
