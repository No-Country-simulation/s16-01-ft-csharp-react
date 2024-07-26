import { useParams } from "react-router-dom";
import { useItemsActions } from "../hooks/useItemsActions";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import CheckBadge from "../assets/CheckBadge";
import { useUserActions } from "../hooks/useUserActions";
import { Order } from "../models/types.d";

export default function ProductPage() {
  const { id } = useParams();
  const { items } = useItemsActions()
  const { user, useSetUserOrderList } = useUserActions()
  const item = items.find(item => item?.item_id === id?.toString())

  const selectItem = (value: string) => {
    if(value !== ''){
      const order = user.order_list.length !== 0 ? 
      user.order_list.find((order: Order ) => order.item_id === value) : ''
    if(order !== ''){
      useSetUserOrderList(user.order_list.map((order: Order) => order.item_id === value ?
        { order_id: value, item_id: value, quantity: order.quantity + 1, order_status: 'selected' } : order))
    } else {
      useSetUserOrderList([...user.order_list,
        { order_id: value, item_id: value, quantity: 1, order_status: 'selected' }])
    }
    }
  }

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      <div className="min-w-[90%] flex flex-col items-center">
        <Card shadow={false} className="min-w-full self-center overflow-y-scroll">
          <CardHeader shadow={false} floated={false} className="h-[17.526rem]">
            <img className="h-full w-full object-cover" />
            {/* <img src={item?.image_url} className="h-full w-full object-cover"/> */}
          </CardHeader>
          <CardBody className="pt-10">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h6" color="black" className="font-bold">
                  { item?.name }
                </Typography>
                <Typography variant="small" className="font-medium text-blue-gray-500">Para {item?.portion} persona(s)</Typography>
              </div>
              <Typography variant="h5" color="black" className="font-medium">
                ${ item?.price.toFixed(2) }
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              
              className="font-normal pt-5 text-lg text-[#607D8B]"
            >
              With plenty of talk and listen time, voice-activated Siri access, and
              an available wireless charging case.
            </Typography>
            <div className="flex gap-4 pt-3">
              {item?.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center gap-[0.1rem]">
                    <CheckBadge /><Typography variant="small" className="capitalize">{keyword}</Typography>
                  </div>
                ))}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              size="lg"
              onClick={() => selectItem(item ? item.item_id : '')}
              className="bg-[#212121] text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Agregar
            </Button>
          </CardFooter>
        </Card>
      </div>
      
    </div>
  )
}
