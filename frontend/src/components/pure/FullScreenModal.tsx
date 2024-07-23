import { Dialog, Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/useUserActions';
import { useNavigate } from 'react-router-dom';
import CheckAnimation from './CheckAnimation';
import ErrorAnimation from './ErrorAnimation';

const FullScreenModal: React.FC = () => {
  const { user, useSetUser } = useUserActions();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState<JSX.Element>(<div></div>);
  const navigate = useNavigate();
  const time = 750;

  useEffect(() => {
    const { state, path, parameter } = user.user_state;
    if (state === 'Loading' || state === 'Completed' || state === 'Error') {
      setIcon(getIcon(state));
      setOpen(true);
      setTimeout(() => {
        navigate(path.concat(parameter));
        useSetUser({ ...user, user_state: { state: '', path: '', parameter: '' } });
        setOpen(false);
      }, time);
    }
  }, [user]);

  const getIcon = (state: string): JSX.Element => {
    switch (state) {
      case 'Loading':
        return <Spinner className="h-16 w-16" />;
      case 'Completed':
        return <CheckAnimation />;
      case 'Error':
        return <ErrorAnimation />;
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        handler={() => setOpen(!open)} 
        size="xxl" 
        className="flex justify-center items-center dialog-slide"
        animate={{
          mount: { opacity: 1, transform: 'translateX(0)' },
          unmount: { opacity: 0, transform: 'translateX(100%)' },
        }}
      >
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          { icon }
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
