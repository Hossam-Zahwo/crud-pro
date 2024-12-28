import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaPhone, FaHashtag } from 'react-icons/fa';
import { MdCreateNewFolder } from "react-icons/md";
import { BsBuildingDash } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="fixed flex flex-col justify-center items-center bg-white z-50 top-0 text-black h-screen w-32">
      <ul className="w-full">
        <li className="mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <FaHome className="text-lg" /> 
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/AddNew"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <MdCreateNewFolder className="text-lg" /> 
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/SalesOverview"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <FaHashtag className="text-lg" /> 
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <BsBuildingDash  className="text-lg" /> 
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <FaInfoCircle className="text-lg" /> 
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-2 bg-gray-400 flex justify-center items-center"
                : "py-2 px-2 hover:bg-gray-500 flex justify-center items-center shadow-md"
            }
          >
            <FaPhone className="text-lg" /> 
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
