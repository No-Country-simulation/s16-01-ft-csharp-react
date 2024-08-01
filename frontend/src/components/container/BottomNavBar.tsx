import { Badge, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import HomeButton from "../../assets/HomeButton";
import ShoppingCartButton from "../../assets/ShoppingCartButton";
import MenuButton from "../../assets/MenuButton";
import { useEffect } from "react";
import { useUsersActions } from "../../hooks/useUsersActions";

export default function BottomNavBar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { myUser } = useUsersActions()

  useEffect(() => {

  }, [location]) 

  return (
    <Navbar shadow={false} blurred={false} className='text-black bg-[#F3F3F3] flex items-center justify-between rounded-none min-w-full border-none px-10 max-h-[6.5rem] fixed bottom-0 left-0 w-full z-50'>
      <div className="flex flex-col items-center">
        <Link to='/home'>
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/home') ? 'bg-[#3F4A4F] text-white' : '' } hover:bg-[#3F4A4F] active:bg-[#3F4A4F] `}>
            <HomeButton />
          </IconButton>
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Inicio
        </Typography>
      </div>
      <div className="flex flex-col items-center">
        <Link to='/menu'>
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/menu') ? 'bg-[#3F4A4F] text-white' : ''} hover:bg-[#3F4A4F] active:bg-[#3F4A4F] `}>
            <MenuButton />
          </IconButton>
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Carta
        </Typography>
      </div>
      <div className="flex flex-col items-center">
        <Link to='/orders'>
        <Badge color="green" content={myUser.order_list?.length.toString()} className="" >
          <IconButton variant="text" className={`bg-white rounded-full ${isActive('/orders') ? 'bg-[#3F4A4F] text-white' : ''} hover:bg-[#3F4A4F] active:bg-[#3F4A4F] `}>
            <ShoppingCartButton />
          </IconButton>
        </Badge>
          
        </Link>
        <Typography variant="small" className={`text-[0.63rem] font-medium`}>
          Pedidos
        </Typography>
      </div>
    </Navbar>
  );
}
