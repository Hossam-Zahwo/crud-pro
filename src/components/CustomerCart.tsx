import React from "react";
import { Product } from "../data/productData"; // Import Product type

interface CustomerCartProps {
  purchases: Product[];
  removeFromCart: (id: number) => void; // Add removeFromCart prop
  customerName: string; // Add customerName prop
  customerPhone: string; // Add customerPhone prop
  saleDate: string; // Add saleDate prop
}

const CustomerCart: React.FC<CustomerCartProps> = ({ purchases, removeFromCart, customerName, customerPhone, saleDate }) => {
  const total = purchases.reduce((sum, product) => sum + product.price, 0);
  const tax = total * 0.1; // Assuming 10% tax rate
  const totalWithTax = total + tax;

  return (
    <div className="container mx-auto p-6 sticky">
      <h2 className="text-2xl font-bold mb-4">Customer Purchases</h2>
      <div className="overflow-y-scroll" style={{ maxHeight: '400px', width: '100%' }}>
        <ul className="w-full">
          {purchases.map((product) => (
            <li key={product.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg w-52 shadow-md">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
              </div>
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white p-2 ml-4 rounded-lg hover:bg-red-600"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
        <p className="text-lg font-semibold">Customer: {customerName}</p>
        <p className="text-lg font-semibold">Phone: {customerPhone}</p>
        <p className="text-lg font-semibold">Sale Date: {saleDate}</p>
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <p className="text-lg font-semibold">Tax: ${tax.toFixed(2)}</p>
        <p className="text-xl font-bold">Total with Tax: ${totalWithTax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CustomerCart;
