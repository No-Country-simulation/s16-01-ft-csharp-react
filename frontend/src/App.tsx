import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/pure/FullScreenModal'

function App() {

  return (
    <div className='min-h-screen min-w-screen'>
      <Outlet />
      <FullScreenModal />
    </div>
  )
}

export default App
