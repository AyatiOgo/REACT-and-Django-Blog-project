import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import ResponsiveNavBar from "./ResponsiveNavBar";
import HomePage from "@/pages/HomePage";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({setDarkMode}) => {

    const [showNavBar, setShowNavBar] = useState(false)

  return (
    <>
      <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624]">
        <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          DevFoliio
        </Link>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {/* <li > <NavLink to="profile" className={({ isActive }) => (isActive ? "active" : "")}  > Hi, Clinton </NavLink> </li> */}
          <li><Link> Login </Link></li>
          <li><Link> LogOut </Link></li>
          <li > <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}  >  Register </NavLink> </li>
          <li className="font-semibold"   > <Link> Create post </Link> </li>
        </ul>

        <Switch onClick={()=> setDarkMode((curr)=> !curr  ) } />
        <FaHamburger className="text-2xl cursor-pointer hidden max-md:block dark:text-white" onClick={() => setShowNavBar(curr => !curr)} />
      </nav>

      { showNavBar && <ResponsiveNavBar/>  }
   
    </>
  );
};

export default NavBar;