import { Button, Typography } from "@material-tailwind/react";
import Bell from './bell.svg'

interface CallWaiterButtonProps {
    handleOpen?: () => void;
  }

export const CallWaiterButton: React.FC<CallWaiterButtonProps> = ({ handleOpen }) => {
  return (
    <Button onClick={handleOpen} variant='text' className='flex items-center p-0'>
        <Typography variant='small' className='text-black text-[0.63rem] font-medium capitalize'>
          Llamar
        </Typography>
        <div className='rounded bg-transparent max-w-[35px] max-h-[35px] pl-3'>
          <img src={Bell} />
        </div>
      </Button>
  )
}
