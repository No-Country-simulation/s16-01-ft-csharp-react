import { Button, CardFooter, Typography } from "@material-tailwind/react";
import { Order } from "../../models/types.d";
import Clock from "../../assets/Clock";
import Ellipsis from "../../assets/Ellipsis";
import Check from "../../assets/Check";
import Trash from "../../assets/Trash";
import ArrowPath from "../../assets/ArrowPath";
import { useSocketActions } from "../../hooks/useSocketActions";

interface BottomPerOrderProps {
    order_to_manage: Order,
    itsUser: boolean
}

export const  BottomPerOrder: React.FC<BottomPerOrderProps> = ({ order_to_manage, itsUser }) => {
    const { useDeleteOrder, useRepeatOrder } = useSocketActions()

    const selectButton = () => {
        if(order_to_manage.order_status === 0){
            return (
                <Button variant="outlined" color="gray" className="flex p-2 px-4 items-center rounded-[0.25rem]">
                    <Clock />
                    <Typography variant="small" className="font-bold pl-1 text-[0.8rem]">PENDIENTE</Typography>
                </Button>)
        } else if (order_to_manage.order_status === 1) {
            return (
                <Button variant="outlined" color="gray" className="flex p-2 px-4 items-center rounded-[0.25rem]">
                    <Ellipsis />
                    <Typography variant="small" className="font-bold pl-1 text-[0.8rem]">EN COCINA</Typography>
                </Button>)
        } else if (order_to_manage.order_status === 2) {
            return (
                <Button variant="outlined" color="green" className="flex p-2 px-4 items-center rounded-[0.25rem]">
                    <Check />
                    <Typography variant="small" className="font-bold pl-1 text-[0.8rem]">ENTREGADO</Typography>
                </Button>)
        } else {
            return (<div></div>)
        }
    }

    const deleteOrder = (order_to_delete: Order) => {
        useDeleteOrder(order_to_delete)
    }

    const repeatOrder = (order_to_repeat: Order) => {
        useRepeatOrder(order_to_repeat)
    }

    const returnButton = () => {
        if(order_to_manage.order_status === 0 && itsUser) {
            return (
                <Button variant="text" color="black" className="flex p-2 items-center" onClick={()=> deleteOrder(order_to_manage)} >
                    <Trash />
                    <Typography variant="small" className="capitalize pl-2 pt-[0.125rem]">Eliminar</Typography>
                </Button>
            )
        } else if (order_to_manage.order_status === 2 && itsUser) {
            return (
                <Button variant="text" color="black" className="flex p-2 items-center" onClick={()=> repeatOrder(order_to_manage)} >
                    <ArrowPath />
                    <Typography variant="small" className="capitalize pl-2 pt-[0.125rem]">Repetir</Typography>
                </Button>
            )
        } else {
            return (<div></div>)
        }
    }

  return (
    <CardFooter className="flex min-w-full place-content-between p-0 pt-2 px-2 pb-4">
        <div>{ selectButton() }</div>
        <div>{ returnButton() }</div>
    </CardFooter>
  )
}
