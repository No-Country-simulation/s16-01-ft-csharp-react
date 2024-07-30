import { Button } from "@material-tailwind/react";
import { Item, Order } from "../../models/types.d";
import { useNavigate } from "react-router-dom";
import { useItemsActions } from "../../hooks/useItemsActions";
import { useUsersActions } from "../../hooks/useUsersActions";

export default function CloseOrders() {
  const { myUser, useSetUserOrderList, useSetUserSimple } = useUsersActions()
  const { items } = useItemsActions()
  const navigate = useNavigate()
  const deliveredOrders = () => {
    if(myUser.order_list) {
      if((myUser.order_list.every((order: Order) => order.order_status === 1 || order.order_status === 2))){
        useSetUserOrderList(myUser.order_list.map(({item_id, order_id, order_status}) =>
          order_status === 1 ? { user_id: myUser.user_id, order_id, item_id, order_status: 2 } : 
            { user_id: myUser.user_id, order_id, item_id, order_status }
        ))
      }
    }
  }

  const setQuantityPay = () => {
    if( myUser.order_list){
      useSetUserSimple({ user_id: myUser.user_id, username: myUser.username , quantity_pay: myUser.order_list.reduce((total: number, order: Order) => {
        const item = items.find((item: Item) => 
            item.item_id === order.item_id && order.order_status === 2);
        return total + (item ? item.price : 0)
      }, 0) }) 
    }
  }

  const managedOrders = ()  => {
    deliveredOrders()
    setQuantityPay()
    if(myUser.order_list !== undefined  && myUser.order_list.every((order: Order) => order.order_status === 2)){
      navigate('/expenses')
    }
  }

  return (
    <Button onClick={() => managedOrders()} fullWidth>CERRRAR PEDIDO</Button>
  )
}
