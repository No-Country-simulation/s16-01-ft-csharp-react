import NameForm from "../components/forms/NameForm";
import LogoSM from "../assets/logo-sm.svg"
import { Typography } from "@material-tailwind/react";

export default function RegisterPage() {
  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <img className="size-4/5 pt-20 pb-[3rem]" src={LogoSM} />
        <Typography variant="h2" color="black" className="w-[90%] px-6 pt-6 text-start text-[2.2rem]">
            ¡Te damos
        </Typography>
        <Typography variant="h2" color="black" className="w-[90%] px-6 pb-[3rem] text-start text-[2.2rem]">
            la bienvenida a Orderly!
        </Typography>
      </div>
      <NameForm/>
    </div>
  )
}
