import { Typography } from "@material-tailwind/react";
import WaiterBox from "../components/pure/WaiterBox";
import { useItemsActions } from "../hooks/useItemsActions";
import { Link } from "react-router-dom";
import { DEFAULT_ITEM } from "../store/itemsSlice";

export default function HomePage() {
  const { items } = useItemsActions()
  const dishForToday = items.length > 0 ? items.filter(item => item.category === 'platos').sort((a, b) => a.price - b.price)[0] : DEFAULT_ITEM

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      <div className="max-w-[90%] min-h-full flex flex-col justify-start pt-5">
        <Typography variant="h6" className="pb-1">Los mas recomendados</Typography>
        <div className="flex gap-2 overflow-x-scroll">
          { items.filter(value => parseInt(value.item_id) < 5).sort((a,b)  => a.price - b.price)
            .map((value, index) => (
            <Link key={index} to={`/product/`.concat(value.item_id)} >
              <div  className="max-h-[9.25rem] min-w-[11.75rem] rounded-lg">
              <img src={value.image_url} className="w-full h-full object-cover rounded-lg" />
            </div>
            </Link>
          )) }
        </div>
        
      </div>

      <Link to={`/product/`.concat(dishForToday.item_id ?? '0')} 
        className="w-[90%] min-h-full flex flex-col justify-start pt-5" >
        <div className="w-full min-h-full flex flex-col justify-start pt-5">
        <Typography variant="h6" className="pb-1">Plato del día</Typography>
        <img src={ dishForToday.image_url } className="max-h-[9rem] min-w-[11.75rem] rounded-lg" />
        <div className="flex justify-between pt-2">
          <Typography variant="h5" className="capitalize max-w-[80%] font-semibold text-[1rem]">{ dishForToday.name }</Typography>
          <Typography variant="h5">$ { dishForToday.price }</Typography>
        </div>
        <Typography variant="small" className="text-blue-gray-500">
          Para { dishForToday.portion } persona(s)
        </Typography>
        </div>
      </Link>
      
      
      
      
      <div className="min-w-[90%] flex flex-col justify-start pt-5 pb-5">
        <Link to='/menu'>
          <div className="min-h-[5.6rem] min-w-[80%] bg-[#3F4A4F] text-white rounded-lg flex place-items-end place-content-start mb-7">
            <Typography variant="h5" className="pl-5 pb-5">Nuestra Carta</Typography>
          </div>
        </Link>
        
        <WaiterBox/>
      </div>
    </div>
  )
}
