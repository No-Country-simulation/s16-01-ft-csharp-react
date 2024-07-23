import LogoMD from '../../assets/logo-md.svg'
import Bell from '../../assets/bell.svg'
import { IconButton, Navbar, Typography } from '@material-tailwind/react'

export default function TopNavBar() {
  return (
    <Navbar shadow={false} blurred={false} className='text-black bg-[#F3F3F3] flex items-center justify-between pl-4 pr-2 rounded-none min-w-full border-none max-h-[4.37rem] fixed top-0 left-0 w-full z-50'>
      <img src={LogoMD} className='h-[2rem]' />
      <div className='flex items-center'>
        <Typography variant='small' className='text-[#607D8B] text-[0.63rem] font-medium'>
          Llamar al camarero
        </Typography>
        <IconButton variant="text" className='rounded bg-transparent max-w-[35px] max-h-[35px]'>
          <img src={Bell} />
        </IconButton>
      </div>
    </Navbar>
  )
}
