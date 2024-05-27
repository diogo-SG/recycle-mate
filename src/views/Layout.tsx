import { Navbar } from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="h-screen w-full bg-primary-50 ">
      <Navbar />
      <div className="h-full w-full flex justify-center items-center mt-10 ">
        <Outlet />
      </div>
    </div>
  );
}
