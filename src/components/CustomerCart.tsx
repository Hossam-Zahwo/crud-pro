import React, { useEffect , useState } from "react";
import { Product } from "../productData";
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
  saleId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}

interface CartProduct extends Product {
  quantity: number;
}

const CustomerCart: React.FC<CustomerCartProps> = ({
  purchases,
  removeFromCart,
  updateProductQuantity,
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<string>("percentage");
  const [products, setProducts] = useState<Product[]>(getInitialProducts());

  useEffect(() => {
    let storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");

    // جلب عداد الـ id الحالي أو البدء من 1
    let customerIdCounter = parseInt(localStorage.getItem("customerIdCounter") || "1", 10);

    if (storedCustomers.length > 0) {
      let latestCustomer = storedCustomers[storedCustomers.length - 1];

      // إذا لم يكن لدى العميل id، قم بتعيين id جديد
      if (!latestCustomer.id) {
        latestCustomer.id = customerIdCounter;
        customerIdCounter += 1; // زيادة العداد
        localStorage.setItem("customers", JSON.stringify(storedCustomers));
        localStorage.setItem("customerIdCounter", customerIdCounter.toString());
      }

      setCustomer(latestCustomer);
    } else {
      // إذا لم يكن هناك عملاء، أنشئ عميل جديد مع id=1
      const newCustomer: Customer = {
        id: customerIdCounter,
        name: "New Customer",
        phone: 123456789,
      };
      storedCustomers.push(newCustomer);
      customerIdCounter += 1; // زيادة العداد
      localStorage.setItem("customers", JSON.stringify(storedCustomers));
      localStorage.setItem("customerIdCounter", customerIdCounter.toString());
      setCustomer(newCustomer);
    }

    // إعداد السلة مع الكميات
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

  const discountAmount = discountType === "percentage" ? total * (discount / 100) : discount;

  const effectiveDiscount = Math.max(Math.min(discountAmount, total + tax), 0);
  const totalWithTaxAndDiscount = total + tax - effectiveDiscount;

  const finalTotal = Math.max(totalWithTaxAndDiscount, 0);

  const saveSaleToLocalStorage = () => {
    if (!customer) {
      alert("No customer data available!");
      return;
    }

    const currentSaleId = parseInt(localStorage.getItem("saleIdCounter") || "1", 10);

    const sale: Sale = {
      saleId: currentSaleId,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      saleDate: new Date().toISOString(),
      purchases: cartProducts,
      total: finalTotal,
    };

    const updatedProducts = products.map((product) => {
      const cartProduct = cartProducts.find((item) => item.id === product.id);
      if (cartProduct) {
        return { ...product, stock: product.stock - cartProduct.quantity };
      }
      return product;
    });

    saveProductsToLocalStorage(updatedProducts);
    setProducts(updatedProducts);

    const storedSales = JSON.parse(localStorage.getItem("sales") || "[]");
    localStorage.setItem("sales", JSON.stringify([...storedSales, sale]));

    localStorage.setItem("saleIdCounter", (currentSaleId + 1).toString());

    alert("Sale has been saved successfully!");
  };

  return (
    <div className="container mx-auto p-6 sticky bg-slate-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Customer Purchases</h2>
      {customer && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Customer ID: {customer.id}</p>
          <p className="text-lg font-semibold">Customer: {customer.name}</p>
          <p className="text-lg font-semibold">Phone: {customer.phone}</p>
        </div>
      )}
      <div className="" style={{ maxHeight: "400px", width: "100%" }}>
        <ul className="w-full">
          {cartProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center my-1 p-4 bg-gray-100 rounded-lg w-52 shadow-md"
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
        <p className="text-xl font-bold">
          Total with Tax and Discount: ${finalTotal.toFixed(2)}
        </p>
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
