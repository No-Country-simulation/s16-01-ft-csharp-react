import PreferenceForm from "../components/forms/PreferenceForm";
import LogoTextSM from '../assets/logo-text-sm.svg'
import GreetingsWithTime from "../components/pure/GreetingsWithTime";
import { Typography } from "@material-tailwind/react";

export default function PreferencePage() {
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full h-full flex flex-col items-center min-h-screen">
        <div className="flex flex-col items-start w-full px-8 pt-8">
          <img className="size-[35%] pt-20 pb-[5rem]" src={LogoTextSM} />
          <GreetingsWithTime/>
          <Typography variant="h2" color="black" className="pt-10 pb-10 text-start text-[1.2rem]">
            ¿Nos quieres compartir alguna restricción alimenticia que tengas?
          </Typography>
        </div>
        <PreferenceForm/>
      </div>
    </div>
  )
}
