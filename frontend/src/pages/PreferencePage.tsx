import LogoTextSM from '../assets/logo-text-sm.svg'
import GreetingsWithTime from "../components/pure/GreetingsWithTime";
import { Typography } from "@material-tailwind/react";
import { PreferenceForm } from '../components/forms/PreferenceForm';

export default function PreferencePage() {

  return (
    <div className="min-h-full min-w-full flex flex-col items-center">
      <div className="flex flex-col items-center max-w-full pb-[10%]">
        <div className="flex flex-col items-start pt-8 max-w-[90%]">
          <img className="min-h-[1.95rem] pt-20 pb-[5rem]" src={LogoTextSM} />
          <GreetingsWithTime/>
          <Typography variant="h5" color="black" className="pt-10 pb-10 text-start font-normal">
            ¿Quieres excluir algún ingrediente de tu menú?
          </Typography>
        </div>
        <PreferenceForm father='page' />
      </div>
    </div>
  )
}
