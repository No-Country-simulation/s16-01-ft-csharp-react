import LogoMD from '../../assets/logo-md.svg'
import { Button, Navbar, Typography } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowLeft from '../../assets/ArrowLeft'
import { WaiterModal } from './WaiterModal'

export default function TopNavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const BackButton = (value: string) => {
    return (<Button 
      variant='text' 
      className='flex gap-2 items-center place-content-center p-0 px-2'
      onClick={() => navigate(-1)}
      >
      <ArrowLeft />
      <Typography variant='h6' className='capitalize'>{value}</Typography>
    </Button>)
  }
  const goToBack = () => {
    if(location.pathname === '/menu' || location.pathname.startsWith('/product') ) {
      return BackButton('Carta')
    } else if(location.pathname === '/orders') {
      return BackButton('Pedidos')
    } else if(location.pathname === '/expenses') {
      return BackButton('Resumen de pedidos')
    } else {
      return <img src={LogoMD} className='h-[2rem]' />
    }
  }

  return (
    <Navbar shadow={false} blurred={false} className='text-black bg-[#F3F3F3] flex items-center justify-between px-4 rounded-none min-w-full border-none h-[4.37rem]  fixed top-0 left-0 w-full z-50'>
      { goToBack() }
      <WaiterModal />
    </Navbar>
  )
}
