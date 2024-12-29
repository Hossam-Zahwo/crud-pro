import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLineWeight } from "react-icons/md";
import CustomerForm, { Customer } from "./CustomerForm"; // Import CustomerForm and Customer type

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  onSaveCustomer: (customer: Customer) => void; // Add onSaveCustomer prop
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategory,
  setSelectedCategory,
  categories,
  onSaveCustomer,
}) => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="flex justify-center items-center w-full">
      <nav className="fixed top-0 left-0 p-4 z-50 shadow-md w-full bg-white mx-5 rounded-[30px]">
        <div className="flex justify-between items-center flex-wrap px-4">
          <h1 className="text-xl font-semibold flex-1 text-center md:text-left">
            Order
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center shadow-md border-gray-600 rounded-lg overflow-hidden flex-1 md:w-1/3"
          >
            <input
              type="search"
              placeholder="Search..."
              className="p-2 w-full text-gray-900 rounded-l-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-white p-2 text-gray-700 rounded-r-lg">
              <FaSearch />
            </button>
          </form>

          {/* Filters Section */}
          <div className="flex items-center space-x-4 flex-wrap mt-4 md:mt-0 md:mx-5">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min Price"
                className="p-2 border border-gray-300 rounded-md"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="p-2 border border-gray-300 rounded-md"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Customer Form Button */}
          <button
            onClick={() => setShowCustomerForm(true)}
            className="bg-white p-2 text-gray-700 rounded-full shadow-md mt-4 md:mt-0"
          >
            <MdLineWeight />
          </button>
        </div>
      </nav>

      {/* Customer Form Modal */}
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
