// src/components/CustomerOrder.tsx

import React from 'react';
import { Product } from '../data/productData';
import { Customer } from './CustomerForm';

interface CustomerOrderProps {
  customer: Customer;
  products: Product[];
  onAddProduct: (product: Product) => void;
  total: number;
  tax: number;
}

const CustomerOrder: React.FC<CustomerOrderProps> = ({ customer, products, onAddProduct, total, tax }) => {
  const handleAddProduct = (product: Product) => {
    onAddProduct(product);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order for {customer.name}</h2>
      <p className="mb-4">Phone: {customer.phone}</p>
      <ul className="mb-4">
        {products.map((product) => (
          <li key={product.id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{product.name}</h4>
              <p>{product.price}$</p>
            </div>
            <button
              onClick={() => handleAddProduct(product)}
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 mt-4">
        <p className="text-lg font-semibold">Total: {total}$</p>
        <p className="text-lg font-semibold">Tax: {tax}$</p>
        <p className="text-lg font-semibold">Total with Tax: {(total + tax).toFixed(2)}$</p>
      </div>
    </div>
  );
};

export default CustomerOrder;
