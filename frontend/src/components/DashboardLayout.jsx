import { Outlet } from "react-router-dom";
import { DesktopSideBar } from "./SideBar";
import { MobileSideBar } from "./SideBar";

export default function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <main className="flex flex-row-reverse">
        {/*Destop Sidebar  */}
        <DesktopSideBar />
        {/*Mobile Sidebar  */}
        <MobileSideBar />
        <Outlet />
      </main>
    </div>
  );
}
