import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaPhone } from 'react-icons/fa'; // استيراد الأيقونات من react-icons

function Navbar() {
  return (
    <nav className="flex flex-col justify-center items-center sticky top-0 bg-black text-white h-screen w-52">
      <ul className="w-full">
        <li>
          <Link to="/" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaInfoCircle className="mr-2" /> About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="block py-2 px-4 hover:bg-gray-700 flex items-center">
            <FaPhone className="mr-2" /> Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
