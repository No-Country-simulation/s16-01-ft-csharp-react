import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/container/FullScreenModal'

function App() {

  return (
    <div className='min-h-screen min-w-screen'>
      <Outlet />
      <FullScreenModal />
    </div>
  )
}

export default App
