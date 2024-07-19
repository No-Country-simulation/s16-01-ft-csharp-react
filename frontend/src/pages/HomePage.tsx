import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUserActions } from '../hooks/useUserActions'

export default function HomePage() {
  const { user, useSetUser } = useUserActions();
  const handleOpenWithContext = () => {
    useSetUser({ ...user, user_state: 'Loading' })
  }

  return (
    <div>
      HomePage
      <Link to="/register">Register</Link>
      <Link to="/preference">Register</Link>
      <Button onClick={handleOpenWithContext}>Open Modal</Button>
    </div>
  )
}
