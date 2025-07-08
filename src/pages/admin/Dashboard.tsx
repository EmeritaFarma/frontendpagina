import { SidebarProvider } from "@/components/ui/sidebar";
import { Aside } from "./Aside";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <Aside />
      <main className="p-7 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
