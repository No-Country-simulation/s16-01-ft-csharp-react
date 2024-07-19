import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react"
import { useUserActions } from '../../hooks/useUserActions'

export default function GreetingsWithTime() {
    const { user, useSetUser } = useUserActions();
    const [greeting, setGreeting] = useState('');
  
    const updateGreeting = (currentDate: number) => {
      const hours = currentDate;
      console.log(hours)
      if (8 <= hours && hours <= 12) {
        return 'Buenos Días';
      } else if (13 <= hours && hours <= 20) {
        return 'Buenas Tardes';
      } else if (21 <= hours && hours < 8) {
        return 'Buenas Noches';
      } else {
        return 'Servicio Deshabilitado.'
      }
    };

    const handleName = () => {
      useSetUser({ ...user, username: 'Roko' })
    }

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
        <Typography variant='lead'>{ greeting }</Typography>
        <Typography variant='lead'>{ user.username }</Typography>
        <Button onClick={handleName} >Añadir Roko como nombre</Button>
      </div>
    </div>
  )
}
