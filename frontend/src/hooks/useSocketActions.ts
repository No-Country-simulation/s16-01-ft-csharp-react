import { Order, Payment, User, UserId } from "../models/types";
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

  const checkUserId = () => {
    if(users.length > 0 && user.user_id === ""){
      return users.length.toString()
    } else if (user.user_id !== "") {
      return user.user_id
    } else {
      return '0'
    }
  }

  const useRegister = async (name: string) => {
    useReadTheShareContext()
    useSetUser({...user, 
      user_id: checkUserId(), 
      username: name})
    useSetUserSimple({ 
      user_id: checkUserId(), 
      username: name, 
        quantity_pay: 0 })
    useSendAndStringify()
  }

  const usePreference = async (preferences: string[]) => {
    useReadTheShareContext()
    useSetUserPreferences({ user_id: user.user_id, preferences})
    useSendAndStringify()
  }

  const useCreateOrder = async (item_id: string) => {
    useReadTheShareContext()
    if(item_id !== '' && myUser.order_list ){
      useSetUserOrder({ user_id: myUser.user_id, order_id: myUser.order_list.length.toString(), 
        item_id: item_id, order_status: 0 })
    }
    useSendAndStringify()
  }

  const useDeleteOrder = async (order: Order) => {
    useReadTheShareContext()
    if (order.order_status === 0 && myUser.order_list) {
      useSetUserOrderList([...myUser.order_list.filter((orderTo: Order) => (
        orderTo.order_id !== order.order_id))
        .map(({ item_id, order_id, order_status }) =>
        ({ user_id: myUser.user_id, order_id, item_id, order_status })) ])
      useSendAndStringify()
    }
  }

  const useRepeatOrder = async (order: Order) => {
    useReadTheShareContext()
    if(order.order_status === 2 && myUser.order_list){
      useSetUserOrder({ user_id: myUser.user_id, order_id: myUser.order_list.length.toString(), 
          item_id: order.item_id, 
          order_status: 0 })
      useSendAndStringify()
    }
  }

  const useProcessingOrder = async () => {
    useReadTheShareContext()
    if(myUser.order_list){
      useSetUserOrderList(myUser.order_list.map((order: Order) => 
        order.order_status === 0 ? { ...order, order_status: 1 } : order
      ).map(({ item_id, order_id, order_status }) =>
        ({ user_id: myUser.user_id, order_id, item_id, order_status })))
      useSendAndStringify()
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
        useSendAndStringify()
      }
    }
  }

  const usePaymentsInit = async (proportion: 'divided' | 'all' | 'selected', peer_list: User[]) => {
    const paymentsList = useReadTheShareContextToPay() || []
    const new_peer_list = peer_list.map((peer: User) => ({ user_id: peer.user_id }))
    const myPayment = paymentsList.find((value: Payment)=>{ value.user_id === myUser.user_id }) 
    if(myPayment){
      myPayment.proportion = proportion
      myPayment.peer_list = new_peer_list 
    } else if (!myPayment) {
      paymentsList?.push({ user_id: myUser.user_id, proportion, peer_list: new_peer_list })
    }
    useSendAndStringifyToPay({paymentsList})
  }

  const usePaymentsCheck = (): boolean => {
    const paymentsList = useReadTheShareContextToPay();
    if (paymentsList) {
      const seenUsers = new Set<UserId>(); // Set para rastrear user_ids
      for (const payment of paymentsList) {
        for (const peer of payment.peer_list) {
          if (seenUsers.has({user_id: peer.user_id})) {
            return false; // Duplicado encontrado
          }
          seenUsers.add({user_id: peer.user_id});
        }
      }
    }
    return true; // No se encontraron duplicados
  }

  const useReadTheShareContextToPay = () => {
    if(messages){
      const lastPaymentsList = messages.filter((msg: { message: string; clientOffset: number }) =>
        msg.message.startsWith('{"paymentsList:['))
        .sort((a, b) => b.clientOffset - a.clientOffset)[0]?.message;
        if (lastPaymentsList) {
          const paymentsList: Payment[] = JSON.parse(lastPaymentsList).paymentsList;
          return paymentsList || []
        }
    }
  }

  const useReadTheShareContext = () => {
    if(messages){
      const lastUserList = messages.filter((msg: { message: string; clientOffset: number }) =>
        msg.message.startsWith('{"usersList":[{'))
        .sort((a, b) => b.clientOffset - a.clientOffset)[0]?.message;
        if (lastUserList) {
            const usersList: User[] = JSON.parse(lastUserList).usersList;
            useSetUsers(usersList);
        }
    }
  }

  const useSendAndStringifyToPay = (object: any) => {
    sendMessage({ message: JSON.stringify(object), clientOffset: (socket.auth as Auth).serverOffset })
  }

  const useSendAndStringify = () => {
    sendMessage({ message: JSON.stringify({usersList:users}), clientOffset: (socket.auth as Auth).serverOffset })
    .unwrap()
    .then(response => console.log('Message sent successfully:', response))
    .catch(error => console.error('Error sending message:', error));
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
    useDeliveringOrder,
    useReadTheShareContextToPay,
    usePaymentsInit,
    usePaymentsCheck
  }
}
