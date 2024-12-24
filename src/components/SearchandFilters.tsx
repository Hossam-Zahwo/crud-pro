import React from 'react';

interface SearchandFiltersProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: number;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxPrice: number;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchandFilters({
  searchQuery,
  handleSearchChange,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange
}: SearchandFiltersProps) {
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
    </div>
  )
}

export default SearchandFilters;
