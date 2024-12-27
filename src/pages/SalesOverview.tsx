import React, { useState, useEffect } from 'react';
import { getSalesFromLocalStorage } from '../utils/localStorageUtils';

interface Sale {
  id: number;
  customerName: string;
  customerPhone: string;
  saleDate: string;
  customerId: string;
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
  const [selectedSales, setSelectedSales] = useState<number[]>([]);
  const [selectedSaleDetails, setSelectedSaleDetails] = useState<Sale | null>(null); // لتخزين تفاصيل المبيع المختار
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // للتحكم في حالة نافذة التفاصيل

  useEffect(() => {
    const fetchedSales = getSalesFromLocalStorage();
    setSales(fetchedSales);
  }, []);

  const toggleSaleSelection = (saleId: number) => {
    setSelectedSales((prevSelected) =>
      prevSelected.includes(saleId)
        ? prevSelected.filter((id) => id !== saleId)
        : [...prevSelected, saleId]
    );
  };

  const deleteSale = (saleId: number) => {
    const updatedSales = sales.filter((sale) => sale.id !== saleId);
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    alert('Sale has been deleted successfully!');
  };

  const deleteSelectedSales = () => {
    const updatedSales = sales.filter((sale) => !selectedSales.includes(sale.id));
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    setSelectedSales([]);
    alert('Selected sales have been deleted successfully!');
  };

  const viewSaleDetails = (sale: Sale) => {
    setSelectedSaleDetails(sale); // تعيين تفاصيل المبيع المختار
    setIsModalOpen(true); // فتح نافذة التفاصيل
  };

  const closeModal = () => {
    setIsModalOpen(false); // إغلاق نافذة التفاصيل
    setSelectedSaleDetails(null);
  };

  // Get available years from sales data
  const availableYears = Array.from(
    new Set(sales.map((sale) => new Date(sale.saleDate).getFullYear()))
  );

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
      <div className='w-full flex justify-between items-center'>

        {/* Total sales */}
        <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-center">
          <p className="text-xl font-bold text-blue-600">Total Sales: ${totalSales.toFixed(2)}</p>
        </div>

        {/* Accordion for filters */}
        <div className="accordion bg-gray-100 p-4 rounded-lg shadow-md mb-6">
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

      </div>

      {/* Sales table */}
      <div className="sales-list bg-white p-4 rounded-lg shadow-md">
        {filteredSales.length === 0 ? (
          <p className="text-center text-gray-500">No sales data available for the selected filters.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedSales.length === filteredSales.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSales(filteredSales.map((sale) => sale.id));
                      } else {
                        setSelectedSales([]);
                      }
                    }}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2">Customer ID</th>
                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Discount</th>
                <th className="border border-gray-300 px-4 py-2">Purchases</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => {
                const totalPurchases = sale.purchases.reduce((sum, product) => sum + product.price, 0);
                const discount = totalPurchases - sale.total;

                return (
                  <tr key={sale.id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedSales.includes(sale.id)}
                        onChange={() => toggleSaleSelection(sale.id)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{sale.customerId}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.customerName}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.customerPhone}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.saleDate}</td>
                    <td className="border border-gray-300 px-4 py-2">${sale.total.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">-${discount.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc pl-4">
                        {sale.purchases.map((product, idx) => (
                          <li key={idx}>
                            {product.name}: ${product.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border flex border-gray-300 px-4 py-2 text-center h-auto">
                      <button
                        onClick={() => viewSaleDetails(sale)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteSale(sale.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {selectedSales.length > 0 && (
          <button
            onClick={deleteSelectedSales}
            className="bg-red-500 text-white p-2 mt-4 rounded-lg hover:bg-red-600"
          >
            Delete Selected Sales
          </button>
        )}
      </div>

      {/* Modal for sale details */}
      {isModalOpen && selectedSaleDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Sale Details</h2>
            <p><strong>Customer ID:</strong> {selectedSaleDetails.customerId}</p>
            <p><strong>Customer Name:</strong> {selectedSaleDetails.customerName}</p>
            <p><strong>Phone:</strong> {selectedSaleDetails.customerPhone}</p>
            <p><strong>Sale Date:</strong> {selectedSaleDetails.saleDate}</p>
            <p><strong>Total:</strong> ${selectedSaleDetails.total.toFixed(2)}</p>
            <p><strong>Purchases:</strong></p>
            <ul className="list-disc pl-4">
              {selectedSaleDetails.purchases.map((product, idx) => (
                <li key={idx}>
                  {product.name}: ${product.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOverview;
