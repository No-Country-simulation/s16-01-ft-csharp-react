import { Typography } from "@material-tailwind/react";
import WaiterBox from "../components/pure/WaiterBox";

export default function HomePage() {
  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">

      <div className="min-w-[90%] min-h-full flex flex-col justify-start pt-5">
        <Typography variant="h6" className="pb-1">Los mas recomendados</Typography>
        <div className="flex gap-2 overflow-x-scroll">
          <div className="min-h-[9.25rem] min-w-[60%] bg-black text-white rounded-lg">Plato 1</div>
          <div className="min-h-[9.25rem] min-w-[60%] bg-black text-white rounded-lg">Plato 2</div>
        </div>
        
      </div>

      <div className="min-w-[90%] min-h-full flex flex-col justify-start pt-5">
        <Typography variant="h6" className="pb-1">Plato del día</Typography>
        <div className="min-h-[9.25rem] min-w-full bg-black rounded-lg"></div>
        <div className="flex justify-between pt-2">
          <Typography variant="h6">Nombre del Producto</Typography>
          <Typography variant="h5">$99</Typography>
        </div>
        <Typography variant="small" className="text-blue-gray-500">Para dos personas</Typography>
      </div>
      
      <div className="min-w-[90%] flex flex-col justify-start pt-5 pb-5">
        <div className="min-h-[5.6rem] min-w-[80%] bg-black text-white rounded-lg flex place-items-end place-content-start mb-3">
            <Typography variant="h5" className="pl-5 pb-5">Nuestra Carta</Typography>
        </div>
        <WaiterBox/>
      </div>
    </div>
  )
}
