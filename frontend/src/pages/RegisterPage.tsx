import NameForm from "../components/forms/NameForm";
import LogoSM from "../assets/logo-sm.svg"
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useGetItemsQuery } from "../store/apiSlice";
import { toast } from "sonner";
import { useItemsActions } from "../hooks/useItemsActions";
import { SpecificNotifcation } from "../components/container/SpecificNotifcation";

export default function RegisterPage() {
  const { data, isLoading, isSuccess, isError, error } = useGetItemsQuery('')
  const { useInitItems } = useItemsActions()

  useEffect(() => {
    try {
      if (isSuccess && !isLoading) {
        useInitItems(data)
      } else if (isError) {
          console.error(error)
        }
    } catch (err: any) {
      if (err.data) {
        toast.custom((t: string | number) => 
            (<SpecificNotifcation 
                message={"Error adding Items: ".concat(err.data.message)}
                dismiss={t}
                bgColor="red"
                textColor="back"
            />), { duration: 2000 } )
        } else {
        toast.custom((t: string | number) => 
          (<SpecificNotifcation 
              message={"Error adding Items: ".concat(err.message)}
              dismiss={t}
              bgColor="red"
              textColor="back"
          />), { duration: 2000 } )
      }
    }
  }, [ isLoading, isSuccess, isError, error ])

  return (
    <div className="min-w-full min-h-full flex flex-col items-center ">
      <div className="flex flex-col items-start min-w-full">
        <img className="pt-[10rem] pb-[3rem] self-center" src={LogoSM} />
        <Typography variant="h2" color="black" className="px-[5%] pt-6 text-start">
          ¡Te damos
        </Typography>
        <Typography variant="h2" color="black" className="px-[5%] pb-[3rem] text-start">
          la bienvenida a Orderly!
        </Typography>
      </div>
      <NameForm/>
    </div>
  )
}
