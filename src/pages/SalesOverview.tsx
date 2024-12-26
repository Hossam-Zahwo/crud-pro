import React, { useState, useEffect } from 'react';
import { getSalesFromLocalStorage } from '../utils/localStorageUtils'; // Import getSalesFromLocalStorage

interface Sale {
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const SalesOverview: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filter, setFilter] = useState<{ year: string; month: string; day: string }>({
    year: 'All',
    month: 'All',
    day: 'All',
  });

  useEffect(() => {
    const fetchedSales = getSalesFromLocalStorage();
    setSales(fetchedSales);
  }, []);

  // Get available years from sales data
  const availableYears = Array.from(
    new Set(sales.map((sale) => new Date(sale.saleDate).getFullYear()))
  );
  console.log(sales);

  // Filter sales based on selected filters
  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.saleDate);
    const saleMonth = saleDate.getMonth() + 1;
    const saleYear = saleDate.getFullYear();
    const saleDay = saleDate.getDate();

    const isMonthMatch = filter.month === 'All' || saleMonth === Number(filter.month);
    const isYearMatch = filter.year === 'All' || saleYear === Number(filter.year);
    const isDayMatch = filter.day === 'All' || saleDay === Number(filter.day);

    return isMonthMatch && isYearMatch && isDayMatch;
  });

  // Calculate totals
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sales Overview</h1>

      {/* Accordion for filters */}
      <div className="accordion bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Filters</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-4">

          {/* Filter by year */}
          <div className="flex flex-col items-center">
            <label className="font-semibold mb-2">Filter by year:</label>
            <select
              value={filter.year}
              onChange={(e) => setFilter({ ...filter, year: e.target.value })}
              className="p-2 border rounded bg-white"
            >
              <option value="All">All</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by month */}
          <div className="flex flex-col items-center">
            <label className="font-semibold mb-2">Filter by month:</label>
            <select
              value={filter.month}
              onChange={(e) => setFilter({ ...filter, month: e.target.value })}
              className="p-2 border rounded bg-white"
            >
              <option value="All">All</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month} value={month + 1}>
                  {new Date(0, month).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by day */}
          <div className="flex flex-col items-center">
            <label className="font-semibold mb-2">Filter by day:</label>
            <select
              value={filter.day}
              onChange={(e) => setFilter({ ...filter, day: e.target.value })}
              className="p-2 border rounded bg-white"
            >
              <option value="All">All</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Total sales */}
      <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-center">
        <p className="text-xl font-bold text-blue-600">Total Sales: ${totalSales.toFixed(2)}</p>
      </div>

      {/* Sales list */}
      <div className="sales-list bg-white p-4 rounded-lg shadow-md">
        {filteredSales.length === 0 ? (
          <p className="text-center text-gray-500">No sales data available for the selected filters.</p>
        ) : (
          <ul>
            {filteredSales.map((sale, index) => {
              const totalPurchases = sale.purchases.reduce((sum, product) => sum + product.price, 0);
              const discount = totalPurchases - sale.total;

              return (
                <li key={index} className="border-b p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">{sale.customerName}</h3>
                      <p className="text-gray-700">Phone: {sale.customerPhone}</p>
                      <p className="text-gray-700">Date: {sale.saleDate}</p>
                      <p className="text-gray-700">Total: ${sale.total.toFixed(2)}</p>
                      <p className="text-gray-700">Discount: -${discount.toFixed(2)}</p>
                      <ul className="ml-4 list-disc">
                        {sale.purchases.map((product, idx) => (
                          <li key={idx} className="text-gray-600">
                            {product.name}: ${product.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalesOverview;
