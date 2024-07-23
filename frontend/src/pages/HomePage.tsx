import { Typography } from "@material-tailwind/react";
import WaiterBox from "../components/pure/WaiterBox";

export default function HomePage() {

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      <div className="min-w-[20.5rem] flex flex-col justify-start pt-5">
        <div className="min-h-[8.438rem] min-w-[20.5rem] bg-[#607D8B] rounded flex place-items-center place-content-center mb-3">
            <Typography variant="h6">Nuestra Carta</Typography>
        </div>
        <WaiterBox/>
      </div>
      <div className="min-w-[20.5rem] min-h-full flex flex-col justify-start pt-5">
        <Typography variant="h6" className="pb-1">Plato del día</Typography>
        <div className="min-h-[9.25rem] min-w-full bg-black"></div>
        <div className="flex justify-between pt-2">
          <Typography variant="h6">Nombre del Producto</Typography>
          <Typography variant="h5">$99</Typography>
        </div>
        <Typography variant="small" className="text-blue-gray-500">Para dos personas</Typography>
      </div>
      <div className="min-w-[20.5rem] min-h-full flex flex-col justify-start pt-5 pb-5">
        <Typography variant="h6" className="pb-1">Los mas recomendados</Typography>
        <div className="min-h-[9.25rem] min-w-full bg-black"></div>
        <div className="flex pt-1">
            <Typography variant="h6" className="pt-2">Nombre del Producto</Typography>
            <Typography variant="small" className="text-blue-gray-500">Mas detalles</Typography>
        </div>
      </div>
    </div>
  )
}
