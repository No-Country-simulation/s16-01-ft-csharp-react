import { Dialog, Spinner, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/useUserActions';
import { useNavigate } from 'react-router-dom';
import CheckAnimation from '../pure/CheckAnimation';
import ErrorAnimation from '../pure/ErrorAnimation';
import { UserStatus } from '../../models/types.d';
import LogoSM from '../../assets/LogoSM';

const FullScreenModal: React.FC = () => {
  const { user, useSetUser } = useUserActions();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState<JSX.Element>(<div></div>);
  const navigate = useNavigate();

  useEffect(() => {
    const { status, path, parameter, timeout } = user.state;
    if (status === 1 || status === 2 || status === 3 || status === 4) {
      setIcon(getIcon(status));
      setOpen(true);
      setTimeout(() => {
        if(path !== ''){
          navigate(path.concat(parameter))
        }
        setOpen(false)
        useSetUser({ ...user, state: { status: 0, path: '', parameter: '', message: '', timeout: 0 } });
      }, timeout > 750 ? timeout : 750);
    }
  }, [user]);

  const getIcon = (state: UserStatus): JSX.Element => {
    switch (state) {
      case 1:
        return <Spinner className="h-16 w-16" />;
      case 2:
        return <ErrorAnimation />;
      case 3:
        return <CheckAnimation />;
      case 4:
        return <LogoSM />
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        handler={() => setOpen(!open)} 
        size='xxl'
        className="flex rounded-none justify-center items-center dialog-slide min-h-full min-w-full"
        animate={{
          mount: { opacity: 1, transform: 'translateX(0)' },
          unmount: { opacity: 0, transform: 'translateX(100%)' },
        }}
      >
        <div className="flex justify-center items-center bg-white flex-col">
          { icon }
          <Typography 
            variant='h5' 
            color='black' 
            className='max-w-[70%] text-center pt-10 font-semibold'
          >
              { user.state.message }
          </Typography>
        </div>
      </Dialog>
      <style>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .dialog-slide {
          transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default FullScreenModal;
