import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLineWeight } from "react-icons/md";
import CustomerForm, { Customer } from "./CustomerForm"; // Import CustomerForm and Customer type

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSaveCustomer: (customer: Customer) => void; // Add onSaveCustomer prop
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onSaveCustomer }) => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="flex justify-center items-center">
      <nav className="fixed top-0 left-0  p-4 z-50 shadow-md w-full bg-white mx-5 rounded-[30px]">
        <div className="flex justify-between items-center pr-[20px] pl-[20px]">
          <div className="text-xl font-semibold">Order</div>

          <form onSubmit={handleSearchSubmit} className="flex items-center shadow-md border-gray-600 rounded-lg overflow-hidden">
            <input
              type="search"
              placeholder="Search..."
              className="p-2 w-64 text-gray-900 rounded-l-lg focus:outline-none "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-white p-2 text-gray-700 rounded-r-lg">
              <FaSearch />
            </button>
          </form>
          <button
            onClick={() => setShowCustomerForm(true)}
            className="bg-white p-2 text-gray-700 rounded-full shadow-md"
          >
            <MdLineWeight />
          </button>
        </div>
      </nav>

      {showCustomerForm && (
        <CustomerForm
          onSave={(customer) => {
            onSaveCustomer(customer);
            setShowCustomerForm(false); // Hide the form after saving customer
          }}
          onCancel={() => setShowCustomerForm(false)} // Handle form cancellation
        />
      )}
    </nav>
  );
};

export default Header;
