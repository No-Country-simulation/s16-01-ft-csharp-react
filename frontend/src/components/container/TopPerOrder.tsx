import { CardBody, Typography } from "@material-tailwind/react"
import { Item } from "../../models/types.d"

interface TopPerOrderProps {
    item: Item | undefined
}

export const TopPerOrder: React.FC<TopPerOrderProps> = ({ item }) => {
  return (
    <CardBody className="flex place-content-between p-0 pt-2 px-3 pb-1">
        <Typography variant="h6" className="font-medium text-[#263238]">{ item?.name || '' }</Typography>
        <Typography variant="h5" className="font-bold text-black">$ { item?.price.toFixed(2) || '' }</Typography>
    </CardBody>
  )
}
