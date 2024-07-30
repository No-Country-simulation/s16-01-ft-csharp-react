import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../models/types.d";
import { useUsersActions } from "../../hooks/useUsersActions";
import { useUserActions } from "../../hooks/useUserActions";

export default function CenterOrder() {
  const navigate = useNavigate()
  const { useSetUserStateState } = useUserActions()
  const { myUser, useSetUserOrderList } = useUsersActions()
  const changeOrderToProcessing = () => {
    if(myUser.order_list){
      useSetUserOrderList(myUser.order_list.map((order: Order) => 
        order.order_status === 0 ? { ...order, order_status: 1 } : order
      ).map(({ item_id, order_id, order_status }) =>
        ({ user_id: myUser.user_id, order_id, item_id, order_status })))
    }
    useSetUserStateState({
      status: 3, 
      path: '', 
      parameter: '',
      message: 'Su pedido ha sido enviado a cocina y esta en preparación', 
      timeout: 1000 })
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
