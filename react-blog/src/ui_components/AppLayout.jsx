import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()


function AppLayout() {

  useEffect(()=> {
    if (localStorage.getItem("dark") === null) {
      localStorage.setItem("dark" , "false")
    }
  }, [])

    const [darkMode, setDarkMode] = useState(localStorage.getItem("dark") === "true")

    function handleDarkMode() {
    const newDarkMode =  !darkMode
    setDarkMode(newDarkMode)

    localStorage.setItem("dark", newDarkMode ? "true" : "false" )
    }

    return (
     <QueryClientProvider client={queryClient} > 
      <div className={ darkMode && "dark"}>
    <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
      <NavBar darkMode={darkMode} setDarkMode={handleDarkMode} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </main>
    </div>
    </QueryClientProvider>
    )
}

export default AppLayout
