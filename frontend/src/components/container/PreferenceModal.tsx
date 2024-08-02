import React from "react";
import {
  Card,
  CardBody,
  Dialog,
  Typography
} from "@material-tailwind/react";
import { PreferenceForm } from "../forms/PreferenceForm";
import { SettingsButton } from "../../assets/SettingsButton";

export function PreferenceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <SettingsButton handleOpen={handleOpen} />
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card>
          <CardBody>
            <Typography variant="h5" color="black" className="pt-2 pb-2 text-start">
              ¿Quieres excluir algún ingrediente en tu menú?
            </Typography>
            <PreferenceForm father="modal" handleOpen={handleOpen} />
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}