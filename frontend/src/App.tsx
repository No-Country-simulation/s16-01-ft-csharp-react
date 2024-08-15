import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/container/FullScreenModal'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import { useSocketActions } from './hooks/useSocketActions'
import { useUsersActions } from './hooks/useUsersActions'
import useProtectedRoutes from './hooks/useProtectedRoutes'

function App() {
  const { useSendAndStringify } = useSocketActions()
  const { users } = useUsersActions()

  useEffect(()=>{
    useSendAndStringify({usersList:users})
  }, [users])

  useProtectedRoutes()

  return (
    <div className='min-h-screen min-w-screen'>
      <Outlet />
      <FullScreenModal />
      <Toaster visibleToasts={1} closeButton={true} />
    </div>
  )
}

export default App
