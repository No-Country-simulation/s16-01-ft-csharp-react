import { Dialog, Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/useUserActions'
import { useNavigate } from 'react-router-dom';
import '../../assets/styleModal.css'; 
import CheckAnimation from './CheckAnimation';
import ErrorAnimation from './ErrorAnimation'

const FullScreenModal: React.FC = () =>{
  const { user, useSetUser } = useUserActions();
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState(<div></div>)
  const navigate = useNavigate()
  const time = 1000
  
  const handleOpen = () => {
    setOpen(!open)
  }

  const IconSelector = (value: string) => {
    if(value === 'Loading'){
      return (<Spinner className="h-16 w-16" />)
    } else if(value === 'Completed'){
      return (<CheckAnimation />)
    } else if(value === 'Error'){
      return (<ErrorAnimation />)
    } else {
      return (<div></div>)
    }
  }

  useEffect(() => {
    if(user.user_state.state === 'Loading' || 
        user.user_state.state === 'Completed' || 
        user.user_state.state === 'Error'){
        setIcon(IconSelector(user.user_state.state))
        setOpen(true)
        setTimeout(() => {
            navigate(user.user_state.path.concat(user.user_state.parameter))
            useSetUser({...user, user_state: { state: '', path: '', parameter: ''}})
            setOpen(false)
        }, time)
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
        { icon }
      </div>
    </Dialog>
  );
}

export default FullScreenModal;
