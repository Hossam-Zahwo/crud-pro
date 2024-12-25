import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaPhone , FaHashtag} from 'react-icons/fa';
import { MdCreateNewFolder } from "react-icons/md";


function Navbar() {
  return (
    <nav className="fixed flex flex-col justify-center items-center  z-50 top-0 bg-black text-white h-screen w-32">
      <ul className="w-full">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " py-2 px-4 bg-gray-800 flex items-center"
                : " py-2 px-4 hover:bg-gray-700 flex items-center"
            }
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? " py-2 px-4 bg-gray-800 flex items-center"
                : " py-2 px-4 hover:bg-gray-700 flex items-center"
            }
          >
            <FaInfoCircle className="mr-2" /> About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? " py-2 px-4 bg-gray-800 flex items-center"
                : " py-2 px-4 hover:bg-gray-700 flex items-center"
            }
          >
            <FaPhone className="mr-2" /> Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddNew"
            className={({ isActive }) =>
              isActive
                ? " py-2 px-4 bg-gray-800 flex items-center"
                : " py-2 px-4 hover:bg-gray-700 flex items-center"
            }
          >
            <MdCreateNewFolder className="mr-2" /> AddNew
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive
                ? " py-2 px-4 bg-gray-800 flex items-center"
                : " py-2 px-4 hover:bg-gray-700 flex items-center"
            }
          >
            <FaHashtag className="mr-2" /> Sales
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
