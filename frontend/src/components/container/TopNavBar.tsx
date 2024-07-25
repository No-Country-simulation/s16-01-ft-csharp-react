import LogoMD from '../../assets/logo-md.svg'
import Bell from '../../assets/bell.svg'
import { Button, IconButton, Navbar, Typography } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowLeft from '../../assets/ArrowLeft'

export default function TopNavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const goToBack = () => {
    if(location.pathname === '/menu' || location.pathname.startsWith('/product') ) {
      return  <Button 
                variant='text' 
                className='flex gap-4 items-center place-content-center p-0 px-2'
                onClick={() => navigate(-1)}
                >
                <ArrowLeft />
                <Typography variant='h6' className='capitalize'>Carta</Typography>
              </Button>
    } else if(location.pathname === '/consumption') {
      return  <Button 
                variant='text' 
                className='flex gap-4 items-center place-content-center p-0 px-2'
                onClick={() => navigate(-1)}
                >
                <ArrowLeft />
                <Typography variant='h6' className='capitalize'>Consumos</Typography>
              </Button>
    } else {
      return <img src={LogoMD} className='h-[2rem]' />
    }
  }

  return (
    <Navbar shadow={false} blurred={false} className='text-black bg-[#F3F3F3] flex items-center justify-between pl-4 pr-2 rounded-none min-w-full border-none max-h-[4.37rem] fixed top-0 left-0 w-full z-50'>
      { goToBack() }
      <div className='flex items-center'>
        <Typography variant='small' className='text-black text-[0.63rem] font-medium'>
          Llamar al camarero
        </Typography>
        <IconButton variant="text" className='rounded bg-transparent max-w-[35px] max-h-[35px]'>
          <img src={Bell} />
        </IconButton>
      </div>
    </Navbar>
  )
}
