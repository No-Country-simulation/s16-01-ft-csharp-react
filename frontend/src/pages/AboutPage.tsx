import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUserActions } from '../hooks/useUserActions'
import { useUsersActions } from "../hooks/useUsersActions";
import { DEFAULT_PEER } from "../store/usersSlice";
import EventComponent from "./EventComponent";

export default function AboutPage() {
  const { useSetUserStateState, useResetUser } = useUserActions();
  const { useResetUsers, users, useSetUsers } = useUsersActions()

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/register" className="text-blue-600 p-4">Register</Link>
      <Link to="/preference" className="text-blue-600 p-4">Preference</Link>
      <Link to="/home" className="text-blue-600 p-4">Home</Link>
      <Button onClick={() => useResetUser()}>Reset UserState</Button>
      <Button onClick={() => useResetUsers()}>Reset Users</Button>
      <Button onClick={() => useSetUsers([...users, DEFAULT_PEER])}>add one User</Button>
      <Button onClick={() => useSetUserStateState({
        status: 1, path: '/register', parameter: '', message: 'Hola mundo', timeout: 1000 })}>Open Modal Loading</Button>
      <Button onClick={() => useSetUserStateState({
        status: 3, path: '/register', parameter: '', message: '', timeout: 2000 })}>Open Modal Completed</Button>
      <Button onClick={() => useSetUserStateState({
        status: 2, path: '/register', parameter: '', message: '', timeout: 0 })}>Open Modal Error</Button>
        <Button onClick={() => useSetUserStateState({
        status: 4, path: '/invoice', parameter: '', message: 'Hola, probando', timeout: 2500 })}>Open Modal Logo</Button>
      <Button onClick={() => useSetUserStateState({
        status: 2, path: '/product', parameter: '/3', message: '', timeout: 0 })}>Open Product 3</Button>
      <EventComponent />
    </div>
  )
}
