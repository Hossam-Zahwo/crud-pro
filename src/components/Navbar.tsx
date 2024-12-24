import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex flex-col justify-center items-center sticky top-0 bg-black text-white h-screen w-52">
      <ul className="w-full">
        <li>
          <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
        </li>
        <li>
          <Link to="/about" className="block py-2 px-4 hover:bg-gray-700">About</Link>
        </li>
        <li>
          <Link to="/contact" className="block py-2 px-4 hover:bg-gray-700">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
