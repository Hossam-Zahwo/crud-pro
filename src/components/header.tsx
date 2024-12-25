import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLineWeight } from "react-icons/md";
import CustomerCart from "./CustomerCart"; // Import CustomerCart component

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCustomerPurchases: (purchases: Product[]) => void; // Add setCustomerPurchases prop
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, setCustomerPurchases }) => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomerId = Date.now();
    setCustomerId(newCustomerId);
    // Save customer data (You can use localStorage or any other storage method)
    const customerData = { id: newCustomerId, name: customerName, phone: customerPhone };
    localStorage.setItem("customer", JSON.stringify(customerData));
    setShowCustomerForm(false);
    // Initialize customer purchases (example data)
    const initialPurchases: Product[] = [
      { id: 1, name: "T-shirt", description: "Comfortable cotton t-shirt", price: 20, category: "Men", subCategory: "T-shirt", size: "M", stock: 10, inventoryId: 101, image: "" },
    ];
    setCustomerPurchases(initialPurchases); // Set customer purchases
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 z-10 shadow-md bg-white">
        <div className="flex justify-between items-center px-36">
          <div className="text-xl font-semibold">Order</div>

          <form onSubmit={handleSearchSubmit} className="flex items-center shadow-md border-gray-600 rounded-lg overflow-hidden">
            <input
              type="search"
              placeholder="Search..."
              className="p-2 w-64 text-gray-900 rounded-l-lg focus:outline-none"
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
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center text-blue-600">Customer Information</h2>
            <form onSubmit={handleCustomerFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                  placeholder="Customer Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                  placeholder="Customer Phone"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 w-full hover:bg-blue-600 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowCustomerForm(false)}
                className="bg-gray-500 text-white p-3 w-full mt-2 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {customerId && (
        <div className="fixed z-40 top-16 left-0 w-full bg-gray-100 p-4 shadow-md">
          <div className="container mx-auto">
            <h2 className="text-xl font-semibold">Customer: {customerName} ({customerPhone})</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
