import React, { useEffect, useState } from "react";
import { Product } from "../data/productData";
import { getInitialProducts, saveProductsToLocalStorage } from "../utils/localStorageUtils";

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
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<string>('percentage'); // 'percentage' or 'fixed'
  const [products, setProducts] = useState<Product[]>(getInitialProducts()); // Load initial products

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

  // Calculate discount
  const discountAmount = discountType === 'percentage' ? total * (discount / 100) : discount;

  // Ensure discount is not negative and does not exceed total
  const effectiveDiscount = Math.max(Math.min(discountAmount, total + tax), 0);
  const totalWithTaxAndDiscount = total + tax - effectiveDiscount;

  // Ensure the final total is not negative
  const finalTotal = Math.max(totalWithTaxAndDiscount, 0);

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
      total: finalTotal,
    };

    // Update product stock
    const updatedProducts = products.map((product) => {
      const cartProduct = cartProducts.find((item) => item.id === product.id);
      if (cartProduct) {
        return { ...product, stock: product.stock - cartProduct.quantity };
      }
      return product;
    });

    // Save updated products to local storage
    saveProductsToLocalStorage(updatedProducts);
    setProducts(updatedProducts); // Update state with the new product stock

    const storedSales = JSON.parse(localStorage.getItem("sales") || "[]");
    localStorage.setItem("sales", JSON.stringify([...storedSales, sale]));

    alert("Sale has been saved successfully!");
  };

  return (
    <div className="container mx-auto p-6 sticky bg-slate-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Customer Purchases</h2>
      {customer && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Customer: {customer.name}</p>
          <p className="text-lg font-semibold">Phone: {customer.phone}</p>
        </div>
      )}
      <div className="" style={{ maxHeight: "400px", width: "100%" }}>
        <ul className="w-full">
          {cartProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center flex-col my-1 p-4 bg-gray-100 rounded-lg w-[11rem] max-[1100px]:w-[10rem] max-[475px]:w-[9rem] max-[475px]:flex-col max-[475px]:text-center max-[475px]:gap-[0.5rem] shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[80px] h-16 object-cover rounded-lg"
              />
              <div className="flex justify-between items-center gap-[1rem]">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">
                  ${product.price} x {product.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white p-2  rounded-lg hover:bg-red-600"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Discount Section */}
      <div className="mt-4 flex flex-col items-center space-x-2 p-4 bg-white rounded-lg shadow-md">
        <label className="font-semibold">Discount:</label>
        <div className="flex">
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Math.max(Number(e.target.value), 0))}
            className="border p-1 rounded w-14"
          />
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="border p-1 rounded w-14"
          >
            <option value="percentage"> (%)</option>
            <option value="fixed"> ($)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <p className="text-lg font-semibold">Tax: ${tax.toFixed(2)}</p>
        <p className="text-lg font-semibold">Discount: -${effectiveDiscount.toFixed(2)}</p>
        <p className="text-xl font-bold">Total with Tax and Discount: ${finalTotal.toFixed(2)}</p>
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
