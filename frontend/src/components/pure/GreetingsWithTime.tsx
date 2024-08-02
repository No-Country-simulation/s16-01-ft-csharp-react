import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react"
import { useUserActions } from '../../hooks/useUserActions'

export default function GreetingsWithTime() {
    const { user } = useUserActions();
    const [greeting, setGreeting] = useState('');
  
    const updateGreeting = (currentDate: number) => {
      const hours = currentDate;
      if (8 <= hours && hours <= 12) {
        return 'Buenos días';
      } else if (13 <= hours && hours <= 17) {
        return 'Buenas tardes';
      } else if (18 <= hours && hours < 22) {
        return 'Buenas noches';
      } else {
        return 'Servicio Deshabilitado.'
      }
    };

    useEffect(() => {
      setGreeting(updateGreeting(new Date().getHours()));
      const intervalId = setInterval(() => {
        setGreeting(updateGreeting(new Date().getHours()))
      }, 3600000)
      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className='flex items-center'>
      <div>
        <Typography variant='h3' color='black' >{ greeting }</Typography>
        <Typography variant='h3'>{ user?.username }</Typography>
      </div>
    </div>
  )
}
