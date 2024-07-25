import PreferenceForm from "../components/forms/PreferenceForm";
import LogoTextSM from '../assets/logo-text-sm.svg'
import GreetingsWithTime from "../components/pure/GreetingsWithTime";
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useItemsActions } from "../hooks/useItemsActions";
import { items_test } from "../config/test_list";

export default function PreferencePage() {
  const { useInitItems } = useItemsActions();

  /** This process will be moved  */
  useEffect(() => {
    useInitItems(items_test);
  }, []);

  return (
    <div className="min-h-full min-w-full flex flex-col items-center">
      <div className="flex flex-col items-center max-w-full">
        <div className="flex flex-col items-start pt-8 max-w-[90%]">
          <img className="min-h-[1.95rem] pt-20 pb-[5rem]" src={LogoTextSM} />
          <GreetingsWithTime/>
          <Typography variant="h5" color="black" className="pt-10 pb-10 text-start">
            ¿Nos quieres compartir alguna restricción alimenticia que tengas?
          </Typography>
        </div>
        <PreferenceForm/>
      </div>
    </div>
  )
}
