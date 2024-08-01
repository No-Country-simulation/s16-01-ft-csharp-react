import { Avatar, Typography } from "@material-tailwind/react";
import { useUserActions } from "../../hooks/useUserActions";

export default function WaiterBox() {
  const { user } = useUserActions()

  return (
    <div className="flex items-center gap-4">
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
        <div>
          <Typography variant="h6">{ user.waiter_name || 'Romina Alvarado' } </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Camarero(a)
          </Typography>
        </div>
      </div>
  )
}
