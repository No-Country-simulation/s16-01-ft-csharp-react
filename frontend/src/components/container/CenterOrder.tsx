import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/useUserActions";
import { Order } from "../../models/types.d";

export default function CenterOrder() {
  const navigate = useNavigate()
  const { user, useSetUserOrderList } = useUserActions()
  const changeOrderToProcessing = () => {
    useSetUserOrderList(user.order_list.map((order: Order) => 
      order.order_status === 0 ? { ...order, order_status: 1 } : order
    ))
  }

  return (
    <div className="flex place-content-between">
        <Button variant="outlined" className="p-3" onClick={() => navigate('/menu')}>
            <Typography variant="small" className="font-semibold">VOLVER A LA CARTA</Typography>
        </Button>
        <Button className="p-3" onClick={() => changeOrderToProcessing()}>
            <Typography variant="small" className="font-semibold">ENVIAR A LA COCINA</Typography>
        </Button>
    </div>
  )
}
