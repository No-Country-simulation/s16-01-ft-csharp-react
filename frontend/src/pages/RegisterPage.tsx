import NameForm from "../components/forms/NameForm";
import LogoSM from "../assets/logo-sm.svg"
import { Typography } from "@material-tailwind/react";

export default function RegisterPage() {
  return (
    <div className="w-full flex flex-col items-center min-h-full">
      <div className="flex flex-col items-center w-full">
        <img className="pt-[10rem] pb-[3rem]" src={LogoSM} />
        <Typography variant="h2" color="black" className="w-[90%] px-11 pt-6 text-start">
          ¡Te damos
        </Typography>
        <Typography variant="h2" color="black" className="w-[90%] px-11 pb-[3rem] text-start">
          la bienvenida a Orderly!
        </Typography>
      </div>
      <NameForm/>
    </div>
  )
}
