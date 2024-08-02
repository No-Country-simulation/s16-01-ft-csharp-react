import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/useUserActions";
import { useSocketActions } from "../../hooks/useSocketActions";

export default function CenterOrder() {
  const navigate = useNavigate()
  const { useSetUserStateState } = useUserActions()
  const { useProcessingOrder } = useSocketActions()
  const changeOrderToProcessing = () => {
    useProcessingOrder()
    useSetUserStateState({
      status: 3, 
      path: '', 
      parameter: '',
      message: 'Su pedido ha sido enviado a cocina y esta en preparación', 
      timeout: 1000 })
  }

  return (
    <div className="flex flex-row justify-center space-x-3 p-0 pt-10">
        <Button variant="outlined" className="p-1 border-[#787A00] h-[3rem] " fullWidth
          onClick={() => navigate('/menu')}>
            <Typography variant="small" className="font-semibold  text-[#787A00]">VOLVER A LA CARTA</Typography>
        </Button>
        <Button className=" bg-[#787A00] h-[3rem] p-1" fullWidth
          onClick={() => changeOrderToProcessing()}>
            <Typography variant="small" className=" font-semibold  text-white">ENVIAR A LA COCINA</Typography>
        </Button>
    </div>
  )
}
