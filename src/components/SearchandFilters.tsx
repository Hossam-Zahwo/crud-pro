import React, { useEffect, useState } from 'react';
import { getInitialProducts, saveProductsToLocalStorage } from '../utils/localStorageUtils'; // Import save and get functions
import { Product } from '../data/productData'; // Import Product type

interface SearchandFiltersProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: number;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxPrice: number;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SearchandFilters({
  searchQuery,
  handleSearchChange,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
}: SearchandFiltersProps) {
  
  const [products, setProducts] = useState<Product[]>(getInitialProducts());

  // Save updated products to localStorage on any change
  useEffect(() => {
    saveProductsToLocalStorage(products);
  }, [products]);

  // Apply filters
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => product.price >= minPrice)
    .filter(product => maxPrice === Infinity ? true : product.price <= maxPrice)
    .filter(product => selectedCategory === '' ? true : product.category === selectedCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6 w-full">
      <div className="p-6 border rounded-lg shadow-md bg-gray-50 flex-1">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Search</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or category"
          className="border p-3 w-full"
        />
      </div>
      <div className="p-6 border rounded-lg shadow-md bg-gray-50 flex-1">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Price Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border p-3 w-full"
              placeholder="Min Price"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Max Price</label>
            <input
              type="number"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={handleMaxPriceChange}
              className="border p-3 w-full"
              placeholder="Max Price"
            />
          </div>
        </div>
      </div>
      <div className="p-6 border rounded-lg shadow-md bg-gray-50 flex-1">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Category Filter</h2>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-3 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="p-6 border rounded-lg shadow-md bg-gray-50 flex-1">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filtered Products</h2>
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price} - {product.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchandFilters;
