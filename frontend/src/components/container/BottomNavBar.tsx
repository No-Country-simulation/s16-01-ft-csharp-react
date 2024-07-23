import { IconButton, Navbar, Typography } from "@material-tailwind/react";
import Home from '../../assets/home.svg';
import Menu from '../../assets/menu.svg';
import ShoppingCart from '../../assets/shopping-cart.svg';
import { Link, useLocation } from "react-router-dom";

export default function BottomNavBar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar shadow={false} blurred={false} className='text-black bg-[#F3F3F3] flex items-center justify-between rounded-none min-w-full border-none px-10 max-h-[6.5rem] fixed bottom-0 left-0 w-full z-50'>
      <div className="flex flex-col items-center">
        <Link to='/home'>
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/home') ? 'bg-gray-900/20' : '' }`}>
            <img src={Home} />
          </IconButton>
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Inicio
        </Typography>
      </div>
      <div className="flex flex-col items-center">
        <Link to='/menu'>
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/menu') ? 'bg-gray-900/20' : ''}`}>
            <img src={Menu} />
          </IconButton>
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Carta
        </Typography>
      </div>
      <div className="flex flex-col items-center">
        <Link to='/consumption'>
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/consumption') ? 'bg-gray-900/20' : ''}`}>
            <img src={ShoppingCart} />
          </IconButton>
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Consumos
        </Typography>
      </div>
    </Navbar>
  );
}
