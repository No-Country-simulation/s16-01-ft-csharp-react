import './index.css'
import { Outlet } from 'react-router-dom'
import FullScreenModal from './components/pure/FullScreenModal'

function App() {

  return (
    <div className='min-h-full min-w-full'>
      <Outlet />
      <FullScreenModal />
    </div>
  )
}

export default App
