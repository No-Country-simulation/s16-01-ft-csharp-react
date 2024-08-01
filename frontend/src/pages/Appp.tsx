import { Outlet } from "react-router-dom";
import TopNavBar from "../components/container/TopNavBar";
import BottomNavBar from "../components/container/BottomNavBar";

export default function Appp() {

  return (
    <div className="min-h-full min-w-full relative">
      <TopNavBar/>
      <Outlet/>
      <BottomNavBar/>
    </div>
  )
}
