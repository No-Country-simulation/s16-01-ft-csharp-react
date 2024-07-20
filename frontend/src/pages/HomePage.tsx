import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUserActions } from '../hooks/useUserActions'
import type { UserState } from '../models/types.d'

export default function HomePage() {
  const { user, useSetUser } = useUserActions();
  const handleWith = (value: UserState) => {
    useSetUser({ ...user, user_state: value })
  }

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/register" className="text-blue-600 p-4">Register</Link>
      <Link to="/preference" className="text-blue-600 p-4">Preference</Link>
      <Button onClick={() => handleWith({state: 'Loading', path: '/register', parameter: ''})}>Open Modal Loading</Button>
      <Button onClick={() => handleWith({state: 'Completed', path: '/register', parameter: ''})}>Open Modal Completed</Button>
      <Button onClick={() => handleWith({state: 'Error', path: '/register', parameter: ''})}>Open Modal Error</Button>
    </div>
  )
}
