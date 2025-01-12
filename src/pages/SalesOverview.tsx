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
  const [selectedSaleDetails, setSelectedSaleDetails] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [indexFilter, setIndexFilter] = useState<string>('');

  useEffect(() => {
    const fetchedSales = getSalesFromLocalStorage();
    setSales(fetchedSales);
  }, []);

  const toggleSaleSelection = (index: number) => {
    if (selectedSales.includes(index)) {
      setSelectedSales(selectedSales.filter((i) => i !== index));
    } else {
      setSelectedSales([...selectedSales, index]);
    }
  };

  const deleteSale = (index: number) => {
    const updatedSales = sales.filter((_, i) => i !== index);
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    alert('Sale has been deleted successfully!');
  };

  const deleteSelectedSales = () => {
    const updatedSales = sales.filter((_, i) => !selectedSales.includes(i));
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    setSelectedSales([]);
    alert('Selected sales have been deleted successfully!');
  };

  const viewSaleDetails = (sale: Sale) => {
    setSelectedSaleDetails(sale);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSaleDetails(null);
  };

  const printInvoice = (sale: Sale) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const invoiceContent = `
      <html>
        <head><title>Invoice - ${sale.customerName}</title></head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Customer ID:</strong> ${sale.customerId}</p>
          <p><strong>Customer Name:</strong> ${sale.customerName}</p>
          <p><strong>Phone:</strong> ${sale.customerPhone}</p>
          <p><strong>Sale Date:</strong> ${sale.saleDate}</p>
          <p><strong>Total:</strong> $${sale.total.toFixed(2)}</p>
          <h3>Purchases:</h3>
          <ul>
            ${sale.purchases
              .map((product) => `<li>${product.name}: $${product.price.toFixed(2)}</li>`)
              .join('')}
          </ul>
        </body>
      </html>
    `;
    printWindow?.document.write(invoiceContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  const availableYears = Array.from(
    new Set(sales.map((sale) => new Date(sale.saleDate).getFullYear()))
  );

  const filteredSales = sales.filter((sale, index) => {
    const saleDate = new Date(sale.saleDate);
    const saleMonth = saleDate.getMonth() + 1;
    const saleYear = saleDate.getFullYear();
    const saleDay = saleDate.getDate();

    const isMonthMatch = filter.month === 'All' || saleMonth === Number(filter.month);
    const isYearMatch = filter.year === 'All' || saleYear === Number(filter.year);
    const isDayMatch = filter.day === 'All' || saleDay === Number(filter.day);
    const isIndexMatch = indexFilter ? index + 1 === Number(indexFilter) : true;  // Add this line to filter by index

    return isMonthMatch && isYearMatch && isDayMatch && isIndexMatch;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="container mx-auto p-6">
      <div className='w-full flex justify-between items-center'>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-center">
          <p className="text-xl font-bold text-blue-600">Total Sales: ${totalSales.toFixed(2)}</p>
        </div>

        <div className="accordion bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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

            <div className="flex flex-col items-center">
              <label className="font-semibold mb-2">Filter by index:</label>
              <input
                type="text"
                value={indexFilter}
                onChange={(e) => setIndexFilter(e.target.value)}
                className="p-2 border rounded bg-white"
                placeholder="Enter index"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sales-list bg-white p-4 rounded-lg shadow-md overflow-auto">
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
                        setSelectedSales(filteredSales.map((_, index) => index));
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
              {filteredSales.map((sale, index) => {
                const totalPurchases = sale.purchases.reduce((sum, product) => sum + product.price, 0);
                const discount = totalPurchases - sale.total;
                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center h-auto">
                      <input
                        type="checkbox"
                        checked={selectedSales.includes(index)}
                        onChange={() => toggleSaleSelection(index)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.customerName}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.customerPhone}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.saleDate}</td>
                    <td className="border border-gray-300 px-4 py-2">${sale.total.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">-${discount.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul>
                        {sale.purchases.map((product, i) => (
                          <li key={i}>
                            {product.name}: ${product.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border  border-gray-300 px-4 py-2 flex justify-center items-center h-auto gap-2">
                      <button
                        onClick={() => viewSaleDetails(sale)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteSale(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => printInvoice(sale)}
                        className="text-green-600 hover:underline"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={deleteSelectedSales}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
        >
          Delete Selected Sales
        </button>
      </div>

      {isModalOpen && selectedSaleDetails && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <button onClick={closeModal} className="text-red-600 text-xl font-semibold absolute top-4 right-4">
              X
            </button>
            <h2 className="text-xl font-bold">Sale Details</h2>
            <p><strong>Customer Name:</strong> {selectedSaleDetails.customerName}</p>
            <p><strong>Customer ID:</strong> {selectedSaleDetails.customerId}</p>
            <p><strong>Phone:</strong> {selectedSaleDetails.customerPhone}</p>
            <p><strong>Sale Date:</strong> {selectedSaleDetails.saleDate}</p>
            <h3>Purchases:</h3>
            <ul>
              {selectedSaleDetails.purchases.map((product, i) => (
                <li key={i}>{product.name} - ${product.price.toFixed(2)}</li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${selectedSaleDetails.total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOverview;
