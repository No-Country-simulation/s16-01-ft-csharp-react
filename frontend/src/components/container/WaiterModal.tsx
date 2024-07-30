import React from "react";
import {
    Button,
  Card,
  CardBody,
  Dialog,
  Typography
} from "@material-tailwind/react";
import { CallWaiterButton } from "../../assets/CallWaiterButton";
import WaiterBox from "../pure/WaiterBox";
import { toast } from "sonner";
import { SpecificNotifcation } from "./SpecificNotifcation";

export function WaiterModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <CallWaiterButton handleOpen={handleOpen} />
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="min-w-full">
          <CardBody className="p-7">
            <div className="pb-2">
                <WaiterBox />
            </div>
            <Typography variant="h5" color="black" className="pt-2 pb-2 text-start text-xl">
              ¿Deseas llamar al servicio de mesa?
            </Typography>
            <Typography variant="small" className="text-[#607D8B] text-base pb-6">
                El tiempo de espera suele ser entre de 3 a 5 minutos
            </Typography>
            <div className="flex items-center justify-between gap-5">
                <Button 
                    variant="outlined" 
                    color="black" 
                    onClick={ () => handleOpen()}
                    fullWidth
                >
                    CANCELAR
                </Button>
                <Button onClick={ () =>{ 
                  handleOpen()
                  toast.custom((t: string | number) => 
                    (<SpecificNotifcation  
                        message="El servicio de mesa fue notificado" 
                        dismiss={t}
                    />), { duration: 2000 } )
                }} fullWidth >
                    LLAMAR
                </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}