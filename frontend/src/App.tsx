import './index.css'
import { Outlet } from 'react-router-dom'
import BottomNavBar from './components/container/BottomNavBar'
import TopNavBar from './components/container/TopNavBar'

function App() {

  return (
    <div className='flex relative'>
      <TopNavBar />
      <Outlet />
      <BottomNavBar />
    </div>
  )
}

export default App
