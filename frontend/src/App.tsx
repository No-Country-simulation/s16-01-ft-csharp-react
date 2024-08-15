import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/container/FullScreenModal'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import { useSocketActions } from './hooks/useSocketActions'
import { useUsersActions } from './hooks/useUsersActions'
import useProtectedRoutes from './hooks/useProtectedRoutes'

function App() {
  const { useReadTheShareContext } = useSocketActions()
  const { data: messages } = useReceiveMessagesQuery();

  /* useEffect(()=>{
    useSendAndStringify()
  }, [users]) */

  useEffect(()=>{
    useReadTheShareContext()
  }, [messages])

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
