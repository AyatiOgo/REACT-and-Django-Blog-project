import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

function AppLayout({isAuntheticated, username, setIsAuthenticated}) {

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
    
      <div className={ darkMode && "dark"}>
    <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
      <NavBar darkMode={darkMode} setDarkMode={handleDarkMode} isAuntheticated={isAuntheticated} username={username}  setIsAuthenticated={setIsAuthenticated} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </main>
    </div>
    )
}

export default AppLayout
