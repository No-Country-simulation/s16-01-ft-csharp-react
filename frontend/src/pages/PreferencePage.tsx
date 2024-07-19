import PreferenceForm from "../components/forms/PreferenceForm";
import LogoTextSM from '../assets/logo-text-sm.svg'
import GreetingsWithTime from "../components/pure/GreetingsWithTime";

export default function PreferencePage() {
  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen">
      <div className="w-full h-full flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <img className="size-4/5 pt-20 pb-[3rem]" src={LogoTextSM} />
        <GreetingsWithTime/>
      </div>
      <PreferenceForm/>
    </div>
    </div>
  )
}
