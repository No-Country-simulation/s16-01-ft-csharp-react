import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/container/FullScreenModal'
import { Toaster } from 'sonner'

function App() {

  return (
    <div className='min-h-screen min-w-screen'>
      <Outlet />
      <FullScreenModal />
      <Toaster visibleToasts={1} closeButton={true} />
    </div>
  )
}

export default App
