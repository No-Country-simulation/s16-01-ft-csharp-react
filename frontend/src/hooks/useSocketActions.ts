import { Order, User } from "../models/types";
import { Auth, socket, useReceiveMessagesQuery, useSendMessageMutation } from "../store/socketSlice";
import { useUserActions } from "./useUserActions";
import { useUsersActions } from "./useUsersActions";

export const useSocketActions = () => {

  const [sendMessage] = useSendMessageMutation();
  const { data: messages } = useReceiveMessagesQuery();
  const { users, myUser, 
    useSetUserSimple, 
    useSetUsers,
    useSetUserPreferences,
    useSetUserOrder,
    useSetUserOrderList
  } = useUsersActions()
  const { user, useSetUser } = useUserActions() 

  const useRegister = async (name: string) => {
    useReadTheShareContext()
    useSetUser({...user, 
      user_id: user.user_id ? users.length !== 0 ? users.length.toString() : '0' : '0', 
      username: name})
    useSetUserSimple({ 
      user_id: (users.length !== 0 ? users.length : 0).toString(), 
      username: name, 
        quantity_pay: myUser.quantity_pay })
  }

  const usePreference = async (preferences: string[]) => {
    useReadTheShareContext()
    useSetUserPreferences({ user_id: user.user_id, preferences})
  }

  const useCreateOrder = async (item_id: string) => {
    useReadTheShareContext()
    if(item_id !== '' && myUser.order_list ){
      useSetUserOrder({ user_id: myUser.user_id, order_id: myUser.order_list.length.toString(), 
        item_id: item_id, order_status: 0 })
    }
  }

  const useDeleteOrder = async (order: Order) => {
    useReadTheShareContext()
    if (order.order_status === 0 && myUser.order_list) {
      useSetUserOrderList([...myUser.order_list.filter((orderTo: Order) => (
        orderTo.order_id !== order.order_id))
        .map(({ item_id, order_id, order_status }) =>
        ({ user_id: myUser.user_id, order_id, item_id, order_status })) ])
    }
  }

  const useRepeatOrder = async (order: Order) => {
    useReadTheShareContext()
    if(order.order_status === 2 && myUser.order_list){
      useSetUserOrder({ user_id: myUser.user_id, order_id: myUser.order_list.length.toString(), 
          item_id: order.item_id, 
          order_status: 0 })
    }
  }

  const useProcessingOrder = async () => {
    useReadTheShareContext()
    if(myUser.order_list){
      useSetUserOrderList(myUser.order_list.map((order: Order) => 
        order.order_status === 0 ? { ...order, order_status: 1 } : order
      ).map(({ item_id, order_id, order_status }) =>
        ({ user_id: myUser.user_id, order_id, item_id, order_status })))
    }
  }

  const useDeliveringOrder = async () => {
    useReadTheShareContext()
    if(myUser.order_list) {
      if((myUser.order_list.every((order: Order) => 
          order.order_status === 1 || order.order_status === 2))){
        useSetUserOrderList(myUser.order_list.map(({item_id, order_id, order_status}) =>
          order_status === 1 ? { user_id: myUser.user_id, order_id, item_id, order_status: 2 } : 
            { user_id: myUser.user_id, order_id, item_id, order_status }
        ))
      }
    }
  }

  const useReadTheShareContext = () => {
    if(messages){
      const lastUserList = messages.filter((msg: { message: string; clientOffset: number }) =>
        msg.message.startsWith('{usersList:['))
        .sort((a, b) => b.clientOffset - a.clientOffset)[0]?.message;
        if (lastUserList) {
            const usersList: User[] = JSON.parse(lastUserList).usersList;
            useSetUsers(usersList);
        }
    }
  }

  const useSendAndStringify = (object: any) => {
    sendMessage({ message: JSON.stringify(object), clientOffset: (socket.auth as Auth).serverOffset })
  }

  return {
    useReadTheShareContext,
    useSendAndStringify,
    useRegister,
    usePreference,
    useCreateOrder,
    useDeleteOrder,
    useRepeatOrder,
    useProcessingOrder,
    useDeliveringOrder
  }
}
