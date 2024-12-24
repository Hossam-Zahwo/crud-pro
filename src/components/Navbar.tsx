import { NavLink, useLocation} from 'react-router-dom';
import { FaHome, FaInfoCircle, FaPhone , FaHashtag} from 'react-icons/fa'; // استيراد الأيقونات من react-icons




function Navbar() {
  const location = useLocation();  

  const getActiveClass = (path: string) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };
  return (
    <nav className="flex flex-col justify-center items-center sticky top-0 bg-black text-white h-screen w-52">
      <ul className="w-full">
        <li className={getActiveClass("/")}>
          <NavLink to="/" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaHome className="mr-2" /> Home
          </NavLink>
        </li>
        <li className={getActiveClass("/products")}>
          <NavLink to="/products" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaHashtag className="mr-2" /> Products
          </NavLink>
        </li>
        <li className={getActiveClass("/about")}>
          <NavLink to="/about" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaInfoCircle className="mr-2" /> About
          </NavLink>
        </li>
        <li className={getActiveClass("/contact")}>
          <NavLink to="/contact" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaPhone className="mr-2" /> Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
