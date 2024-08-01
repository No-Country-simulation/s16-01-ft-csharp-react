import { Button, Typography } from "@material-tailwind/react";
import { Item, Order, User } from "../../models/types.d";
import { useNavigate } from "react-router-dom";
import { useItemsActions } from "../../hooks/useItemsActions";
import { useUsersActions } from "../../hooks/useUsersActions";
import { useSocketActions } from "../../hooks/useSocketActions";
import { useEffect, useMemo } from "react";

export default function CloseOrders() {
  const { myUser, useSetUserSimple, users } = useUsersActions();
  const { items } = useItemsActions();
  const { useDeliveringOrder } = useSocketActions();
  const navigate = useNavigate();

  const deliveredOrders = () => {
    useDeliveringOrder();
  };

  const setQuantityPay = () => {
    if (myUser.order_list) {
      useSetUserSimple({
        user_id: myUser.user_id,
        username: myUser.username,
        quantity_pay: myUser.order_list.reduce((total: number, order: Order) => {
          const item = items.find((item: Item) => 
            item.item_id === order.item_id && order.order_status === 2
          );
          return total + (item ? item.price : 0);
        }, 0)
      });
    }
  };

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (myUser.order_list?.some((order: Order)=> order.order_status === 1 )) {
      const timer = setTimeout(() => {
        useDeliveringOrder();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [useDeliveringOrder]);

  const managedOrders = () => {
    deliveredOrders();
    setQuantityPay();
    if (
      myUser.order_list !== undefined &&
      myUser.order_list.every((order: Order) => order.order_status === 2)
    ) {
      navigate("/expenses");
    }
  };

  const allOrdersCompleted = useMemo(() => {
      return users.every((user: User) => 
          user.order_list?.every((order: Order) => order.order_status === 2)
      );
    
  }, [users]);

  return (
    <Button 
      onClick={() => managedOrders()} 
      className="bg-[#787A00] h-[3rem] mb-3" 
      fullWidth 
      disabled={!allOrdersCompleted}
    >
      <Typography variant="h6">CERRRAR PEDIDO</Typography>
    </Button>
  );
}
