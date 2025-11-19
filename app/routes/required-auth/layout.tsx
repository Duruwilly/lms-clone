import Sidebar from "./components/sidebar";
import { Outlet } from "react-router";
import Navbar from "./components/navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex">
        <Sidebar />
        <div style={{}} className="flex flex-col w-[82%]">
          <Navbar />
          <div className="flex flex-col gap10 px-6 py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
