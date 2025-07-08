import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { Outlet } from "react-router-dom";

export default function landing() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
