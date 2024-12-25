import { FaSearch } from "react-icons/fa";
import { MdLineWeight } from "react-icons/md";


function Header() {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search logic here
    alert("Search");
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 z-10 shadow-md">
      <div className="flex justify-between items-center px-36">
        <div className="text-xl font-semibold ">
          Order
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex items-center shadow-md border-gray-600  rounded-lg overflow-hidden">
          <input
            type="search"
            placeholder="Search..."
            className="p-2 w-64 text-gray-900 rounded-l-lg focus:outline-none"
          />
          <button type="submit" className=" bg-white p-2 text-gray-700 rounded-r-lg ">
            <FaSearch />
          </button>

          
        </form>
        <button className="bg-white p-2 text-gray-700 rounded-full shadow-md">
        <MdLineWeight />
        </button>
      </div>
    </nav>
  );
}

export default Header;
