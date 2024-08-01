import { Card, Typography } from "@material-tailwind/react";
import { Item, Order, User } from "../models/types.d";
import { useItemsActions } from "../hooks/useItemsActions";
import { BottomPerOrder } from "../components/container/BottomPerOrder";
import { TopPerOrder } from "../components/container/TopPerOrder";
import CenterOrder from "../components/container/CenterOrder";
import CloseOrders from "../components/container/CloseOrders";
import { useUsersActions } from "../hooks/useUsersActions";

export default function OrdersPage() {
  const { items } = useItemsActions(); 
  const { users, myUser } = useUsersActions()
  const totalOrderPrice = myUser.order_list?.reduce((total: number, order: Order) => {
    const item = items.find((item: Item) => item.item_id === order.item_id);
    return total + (item ? item.price : 0);
  }, 0).toFixed(2);

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[13rem]">
      <div className="min-h-full min-w-[90%] flex flex-col overflow-y-scroll">
        <Typography variant="h6" className="font-bold pt-4 pb-1">Mis Pedidos - { myUser.username }</Typography>
        <div>
          {myUser.order_list?.map((order: Order, index: number) => (
            <Card key={index} className="mb-5 px-2">
              <TopPerOrder item={items?.find((item: Item) => item.item_id === order.item_id)} />
              <BottomPerOrder order_to_manage={order} itsUser={true} />
            </Card>
          ))}
        </div>
        <CenterOrder />
      </div>
      {users.filter((user: User) => user.user_id !== myUser.user_id).map((other: User, index: number) => (
        <div key={index} className="min-w-[90%] pb-20">
          <Typography variant="h6" className="font-bold pt-4 pb-1">{other.username}</Typography>
          { other.order_list ? other.order_list.map((order: Order, indexSecond: number) => (
            <Card key={indexSecond} className="mb-5 px-2">
              <TopPerOrder item={items?.find((item: Item) => item.item_id === order.item_id)} />
              <BottomPerOrder order_to_manage={order} itsUser={false} />
            </Card> 
          )) : '' }
        </div>
      ))}
      <div className="min-w-[90%] fixed bottom-[5.5rem] left-0 w-full z-40 px-5 bg-white">
        <div className="flex place-content-between">
          <Typography variant="h6" className="font-bold pt-4 pb-1">Total de mis pedidos</Typography>
          <Typography variant="h6" className="font-bold pt-4 pb-1">$ { totalOrderPrice }</Typography>
        </div>
        <CloseOrders />
      </div>
    </div>
  );
}
