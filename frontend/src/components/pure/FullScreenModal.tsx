import { Dialog, Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/useUserActions'
import { useNavigate } from 'react-router-dom';
import '../../assets/styleModal.css'; 

const FullScreenModal: React.FC = () =>{
  const { user, useSetUser } = useUserActions();
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    console.log('fuera del effect en modal')
    if(user.user_state === 'Loading'){
        console.log('dentro del effect en modal')
        setOpen(true)
        setTimeout(() => {
            useSetUser({...user, user_state: ''})
            navigate('/register')
            setOpen(false)
        }, 650)
    }
  }, [user])

  return (
    <Dialog 
        open={open} 
        handler={handleOpen} 
        size="xxl" 
        className="flex justify-center items-center"
        animate={{
            mount: { opacity: 1, transform: 'translateX(0)' },
            unmount: { opacity: 0, transform: 'translateX(100%)' },
        }}
    >
      <div className="flex justify-center items-center h-screen w-screen bg-white">
        <Spinner className="h-16 w-16" />
      </div>
    </Dialog>
  );
}

export default FullScreenModal;
