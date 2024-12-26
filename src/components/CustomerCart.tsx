import React, { useEffect, useState } from "react";
import { Product } from "../data/productData";

interface CustomerCartProps {
  purchases: Product[];
  removeFromCart: (id: number) => void;
  updateProductQuantity: (id: number, quantity: number) => void;
}

interface Customer {
  id: number;
  name: string;
  phone: number;
}

interface Sale {
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}

interface CartProduct extends Product {
  quantity: number; // Add quantity to track duplicates
}

const CustomerCart: React.FC<CustomerCartProps> = ({
  purchases,
  removeFromCart,
  updateProductQuantity,
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    if (storedCustomers.length > 0) {
      setCustomer(storedCustomers[storedCustomers.length - 1]);
    }

    // Initialize cart with quantity
    const updatedCart = purchases.reduce((acc: CartProduct[], product) => {
      const existingProduct = acc.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);
    setCartProducts(updatedCart);
  }, [purchases]);

  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const tax = total * 0.1;
  const totalWithTax = total + tax;

  const saveSaleToLocalStorage = () => {
    if (!customer) {
      alert("No customer data available!");
      return;
    }

    const sale: Sale = {
      customerName: customer.name,
      customerPhone: customer.phone,
      saleDate: new Date().toISOString(),
      purchases: cartProducts,
      total: totalWithTax,
    };

    const storedSales = JSON.parse(localStorage.getItem("sales") || "[]");
    localStorage.setItem("sales", JSON.stringify([...storedSales, sale]));

    alert("Sale has been saved successfully!");
  };

  return (
    <div className="container mx-auto p-6 sticky">
      <h2 className="text-2xl font-bold mb-4">Customer Purchases</h2>
      {customer && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Customer: {customer.name}</p>
          <p className="text-lg font-semibold">Phone: {customer.phone}</p>
        </div>
      )}
      <div className="overflow-y-scroll" style={{ maxHeight: "400px", width: "100%" }}>
        <ul className="w-full">
          {cartProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg w-52 shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">
                  ${product.price} x {product.quantity}
                </p>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
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
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <p className="text-lg font-semibold">Tax: ${tax.toFixed(2)}</p>
        <p className="text-xl font-bold">Total with Tax: ${totalWithTax.toFixed(2)}</p>
      </div>
      <button
        onClick={saveSaleToLocalStorage}
        className="bg-green-500 text-white p-2 mt-4 rounded-lg hover:bg-green-600"
      >
        Save Sale
      </button>
    </div>
  );
};

export default CustomerCart;
