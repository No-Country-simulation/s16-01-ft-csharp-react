import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUserActions } from '../hooks/useUserActions'
import { UserStateState, type UserState } from '../models/types.d'
import routes from "../config/routes";

export default function AboutPage() {
  const { useSetUserState, useResetUser } = useUserActions();
  const handleWith = (value: UserState) => {
    useSetUserState({ ...value })
  }
  
  const renderRoutes = (routes: any, parentPath = "") => {
    return routes.map((route: any, index: number) => {
        const fullPath = `${parentPath}${route.path}`;
        return (
            <div key={index} className="ml-4">
                <div className="text-blue-600 p-0">{fullPath}</div>
                {route.children && renderRoutes(route.children, fullPath)}
            </div>
        );
    });
  };

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/register" className="text-blue-600 p-4">Register</Link>
      <Link to="/preference" className="text-blue-600 p-4">Preference</Link>
      <Link to="/home" className="text-blue-600 p-4">Home</Link>
      <Button onClick={() => useResetUser()}>Reset User</Button>
      <Button onClick={() => handleWith({state: UserStateState.Loading, path: '/register', parameter: '', message: '' })}>Open Modal Loading</Button>
      <Button onClick={() => handleWith({state: UserStateState.Completed, path: '/register', parameter: '', message: '' })}>Open Modal Completed</Button>
      <Button onClick={() => handleWith({state: UserStateState.Error, path: '/register', parameter: '', message: '' })}>Open Modal Error</Button>
      <div>
        <h1>Rutas existentes:</h1>
        {renderRoutes(routes)}
      </div>
    </div>
  )
}
