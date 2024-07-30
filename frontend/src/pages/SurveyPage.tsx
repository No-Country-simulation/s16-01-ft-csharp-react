import SurveyForm from "../components/forms/SurveyForm";
import LogoTextSM from '../assets/logo-text-sm.svg'
import { Typography } from "@material-tailwind/react";

export default function SurveyPage() {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="flex flex-col items-center max-w-full pb-[10%]">
      <div className="flex flex-col items-start pt-8 max-w-[84%]">
          <img className="min-h-[1.95rem] pt-20 pb-[5rem]" src={LogoTextSM} />
          <Typography variant="h3" color="black" className="pt-5 pb-2 text-start font-bold max-w-[60%]">
            ¿Podrías contarnos tu experiencia?
          </Typography>
        </div>
        <SurveyForm />
      </div>
    </div>
  )
}
