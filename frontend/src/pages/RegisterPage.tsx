import NameForm from "../components/forms/NameForm";
import LogoSM from "../assets/logo-sm.svg"
import { Typography } from "@material-tailwind/react";

export default function RegisterPage() {
  return (
    <div className="min-w-full min-h-full flex flex-col items-center ">
      <div className="flex flex-col items-start min-w-full">
        <img className="pt-[10rem] pb-[3rem] self-center" src={LogoSM} />
        <Typography variant="h2" color="black" className="px-[10%] pt-6 text-start">
          ¡Te damos
        </Typography>
        <Typography variant="h2" color="black" className="px-[10%] pb-[3rem] text-start">
          la bienvenida a Orderly!
        </Typography>
      </div>
      <NameForm/>
    </div>
  )
}
