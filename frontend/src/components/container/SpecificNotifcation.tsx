import { Chip, Typography } from "@material-tailwind/react";
import { toast } from "sonner";
import React from "react";

interface SpecificNotifcationProps {
    bgColor?: string,
    message: string,
    textColor?: string,
    dismiss?: string | number
}

export const SpecificNotifcation: React.FC<SpecificNotifcationProps> = ({ 
    bgColor = '#4CAF50', textColor = 'white', message, dismiss }) => {
  return (
    <Chip 
        className={'mb-20 capitalize mr-0 min-w-fit p-2 px-3'} 
        style={{ backgroundColor: bgColor, color: textColor, marginRight: 0 }}
        onClose={() => toast.dismiss(dismiss)}
        size="sm"
        value={<Typography variant="small" >{message}</Typography>}
        />
    )
}
