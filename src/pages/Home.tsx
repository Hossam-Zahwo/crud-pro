import React, { useState } from "react";
import Header from "../components/header"; // Import Header
import { FaHashtag } from "react-icons/fa"; // Import FaHashtag for icon

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  stock: number;
  inventoryId: number;
};

function Home() {
  // Store sub-categories with their associated categories
  const [subCategories, setSubCategories] = useState([
    { name: 'T-shirt', for: ['Men', 'Women'] },
    { name: 'Pants', for: ['Men', 'Women'] },
    { name: 'Jacket', for: ['Men', 'Women'] },
    { name: 'Shoes', for: ['Men', 'Women'] },
    { name: 'Shirt', for: ['Men', 'Women'] },
    { name: 'Scarf', for: ['Women'] },
    { name: 'Pocket', for: ['Women'] },
    { name: 'Dress', for: ['Women'] },
  ]);

  // Extract unique categories (Men, Women)
  const categories = Array.from(new Set(subCategories.flatMap(sub => sub.for)));

  // Retrieve products from localStorage
  const products = localStorage.getItem("products");
  let currentProducts: Product[] = [];
  if (products !== null) {
    currentProducts = JSON.parse(products) as Product[];
  } else {
    console.log("Data Is Not Found Now");
  }

  // State to track selected gender and category
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter products based on selected gender and category
  const filteredProducts = currentProducts.filter((product) => {
    const genderMatch = selectedGender === "All" || product.category === selectedGender;
    const categoryMatch = selectedCategory === "All" || product.name === selectedCategory;
    return genderMatch && categoryMatch;
  });

  // Get the sub-categories based on selected gender
  const genderSubCategories = subCategories.filter(sub => sub.for.includes(selectedGender));

  return (
    <div className="container mx-auto pt-16"> {/* Add pt-16 to prevent overlap with fixed header */}
      <Header categories={categories} /> {/* Pass categories to Header */}
      
      <div className="content">
        {/* Gender Filter Section */}
        <nav className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedGender("All")}
            className={`p-2 ${selectedGender === "All" ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedGender(category)}
              className={`p-2 ${selectedGender === category ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Clothing Type Filter Section */}
        {selectedGender !== "All" && (
          <nav className="flex space-x-4 mb-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`p-2 ${selectedCategory === "All" ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
            >
              All
            </button>
            {genderSubCategories.map((subCategory, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(subCategory.name)}
                className={`p-2 ${selectedCategory === subCategory.name ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
              >
                {subCategory.name}
              </button>
            ))}
          </nav>
        )}
        
        {/* Product List Section */}
        <section className="pt-8 pb-8 w-full">
          <div className="products">
            <h1 className="text-center mb-[15px] text-blue-600 text-[35px] font-bold">Show Products</h1>
            <div className="item-products pl-4 pr-4">
              {filteredProducts.map((product) => (
                <div
                  className="item flex items-center p-3 mb-[10px] max-[767px]:flex-col max-[767px]:items-start bg-slate-300"
                  key={product.id}
                >
                  <div className="flex gap-[1rem] mr-4 items-center">
                    <FaHashtag />
                    <h4 className="text-[20px] font-semibold uppercase text-blue-400">{product.name}</h4>
                  </div>
                  <p className="text-gray-700 flex-1 text-lg capitalize">{product.description}</p>
                  <p className="text-gray-700 mr-3 text-lg">{product.price}$</p>
                  <button className="bg-red-500 text-white p-2 m-1 hover:bg-red-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">Delete</button>
                  <button className="bg-yellow-500 text-white p-2 m-1 hover:bg-yellow-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">Edit</button>
                  <button className="bg-green-500 text-white p-2 m-1 hover:bg-green-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">View</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
