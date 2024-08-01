import { useParams } from "react-router-dom";
import { useItemsActions } from "../hooks/useItemsActions";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react"
import { Item } from "../models/types.d";
import CheckBadge from "../assets/CheckBadge";
import { useEffect, useState } from "react";
import { useSocketActions } from "../hooks/useSocketActions";

export default function ProductPage() {
  const { id } = useParams();
  const { items } = useItemsActions()
  const { useCreateOrder } = useSocketActions()
  const [item, setItem] = useState<Item>()
  const findItem = () => {
    return items.find((item: Item) => item.item_id.toString() === id)
  }

  useEffect(() => {
    setItem(findItem())
  }, [id, item])

  const selectItem = (value: string) => {
    useCreateOrder(value)
  }

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      <div className="min-w-[90%] flex flex-col items-center">
        <Card shadow={false} className="min-w-full self-center overflow-y-scroll">
          <CardHeader shadow={false} floated={false} className="h-[17.526rem]">
            <img src={item?.image_url} className="h-full w-full object-cover"/>
          </CardHeader>
          <CardBody className="pt-6">
            <div>
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="black" className="font-normal">
                  { item?.name }
                </Typography>
                <Typography variant="h5" color="black" className="font-medium">
                  $ { item?.price.toFixed(2) }
                </Typography>
              </div>
              <Typography 
                variant="small" 
                className="font-medium text-blue-gray-500">
                  Para { item?.portion } persona(s)
              </Typography>
            </div>
            <Typography
              variant="paragraph"
              className="font-normal pt-5 text-[#607D8B] "
            >
              { item?.description }
            </Typography>
            <div className="flex gap-4 pt-3">
              { item?.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center gap-[0.1rem]">
                    <CheckBadge /><Typography variant="small" className="capitalize">{keyword}</Typography>
                  </div>
                )) }
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              size="lg"
              onClick={() => selectItem(item ? item.item_id : '')}
              className="bg-[#787A00] p-0 h-[3rem] text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              <Typography variant="h6" className="" >Agregar</Typography>
            </Button>
            <div className="pb-2">
            <Typography variant="h6" color="black" className="font-bold pt-5 pb-3"><ul>Ingredientes:</ul></Typography>
            { item?.ingredients.map((ingredient: string, index: number) => (
              <Typography key={index} className="capitalize" ><li>{ ingredient }</li></Typography>
            )) }
            </div>
          </CardFooter>
        </Card>
      </div>
      
    </div>
  )
}
