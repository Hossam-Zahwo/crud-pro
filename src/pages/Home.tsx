import React, { useState, useEffect } from "react";
import Header from "../components/header"; // Import Header
import { MdAddBusiness } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import CustomerCart from "../components/CustomerCart"; // Import CustomerCart
import CustomerForm, { Customer } from "../components/CustomerForm"; // Import CustomerForm
import AddProductForm from "../components/AddProductForm"; // Import AddProductForm for editing
import { getInitialProducts, saveProductsToLocalStorage } from "../utils/localStorageUtils";
import { Product } from "../data/productData";

function Home() {
  const [subCategories, setSubCategories] = useState([
    { name: 'T-shirt', for: ['Men', 'Women'] },
    { name: 'Pants', for: ['Men', 'Women'] },
    { name: 'Jacket', for: ['Men', 'Women'] },
    { name: 'Shoes', for: ['Men', 'Women'] },
    { name: 'Shirt', for: ['Men', 'Women'] },
    { name: 'Scarf', for: ['Women'] },
    { name: 'Pocket', for: ['Women'] },
    { name: 'Dress', for: ['Women'] },
  ]);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(getInitialProducts());
  const [customerPurchases, setCustomerPurchases] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to manage the selected product for view
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null); // State to manage product for editing
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null); // State to manage customer data
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false); // State to control customer form display
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString()); // State to store current date
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // State to manage selected quantity

  const categories = Array.from(new Set(products.map((product) => product.category))); // Unique categories

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(debouncedSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery]);

  useEffect(() => {
    saveProductsToLocalStorage(products);
  }, [products]);

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);

    const deletedTime = new Date().toLocaleTimeString();
    const deletedDate = new Date().toLocaleDateString();

    const deletedProducts = JSON.parse(localStorage.getItem('products-delete') || '[]');

    const productToDelete = products.find(product => product.id === id);
    if (productToDelete) {
      deletedProducts.push({
        ...productToDelete,
        deletedTime,
        deletedDate
      });
    }

    localStorage.setItem('products-delete', JSON.stringify(deletedProducts));

    const deletedCount = JSON.parse(localStorage.getItem('deletedCount') || '0');
    localStorage.setItem('deletedCount', JSON.stringify(deletedCount + 1));
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product); // Set the selected product for viewing details
  };

  const handleEdit = (product: Product) => {
    setSelectedProductForEdit(product); // Set the selected product for editing
  };

  const handleCancelView = () => {
    setSelectedProduct(null); // Reset the selected product
  };

  const handleCancelEdit = () => {
    setSelectedProductForEdit(null); // Close the edit modal
  };

  const handleAddToCart = (product: Product) => {
    if (!customer) {
      alert("Please add customer details before adding to the cart.");
      return;
    }

    if (product.stock < selectedQuantity) {
      alert("Insufficient stock available.");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - selectedQuantity } : p
      )
    );

    const productToAdd = { ...product, quantity: selectedQuantity };
    setCustomerPurchases((prevPurchases) => [...prevPurchases, productToAdd]); // Add product to customer purchases
    setSelectedQuantity(1); // Reset quantity
  };

  const handleRemoveFromCart = (productId: number) => {
    const productToRemove = customerPurchases.find((product) => product.id === productId);

    if (productToRemove) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, stock: p.stock + productToRemove.quantity } : p
        )
      );
    }

    const updatedPurchases = customerPurchases.filter(product => product.id !== productId);
    setCustomerPurchases(updatedPurchases); // Remove product from customer purchases
  };

  const handleSaveCustomer = (customer: Customer) => {
    setCustomer(customer); // Save customer data
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseFloat(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseFloat(e.target.value) || Infinity);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    const categoryMatch = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const priceMatch =
      product.price >= minPrice && product.price <= maxPrice;

    return searchMatch && categoryMatch && priceMatch;
  });

  return (
    <div className="container mx-auto pt-16 flex max-[991px]:flex-col">
      {/* Customer Cart Section */}
      <div className="w-1/4 p-4 bg-gray-100 shadow-md max-[991px]:w-full">
        {customer ? (
          <CustomerCart
            purchases={customerPurchases}
            removeFromCart={handleRemoveFromCart}
            customerName={customer.name}
            customerPhone={customer.phone}
            saleDate={currentDate} // Pass current date to CustomerCart
          />
        ) : null}
      </div>

      <div className="content w-3/4 p-4 max-[991px]:w-full">
        <Header 
          searchQuery={debouncedSearchQuery} 
          setSearchQuery={setDebouncedSearchQuery} // Pass search query handler to header
          onSaveCustomer={handleSaveCustomer} // Pass handleSaveCustomer to header
        />

        {/* Search and Filter Section */}
        <div className="flex justify-center items-center">
          <div className="py-6 px-3 flex justify-center items-center border rounded-lg shadow-md bg-gray-50  flex-1 h-20">
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border p-3 w-full"
              placeholder="Min Price"
            />
            <input
              type="number"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={handleMaxPriceChange}
              className="border p-3 w-full"
              placeholder="Max Price"
            />
          </div>

          <div className="py-6 px-3 flex justify-center items-center border rounded-lg shadow-md bg-gray-50  flex-1 h-20">
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
        </div>

        {/* Product List Section */}
        <section className="pt-8 pb-8 w-full">
          <div className="products grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                className="item p-4 border rounded-lg shadow-md bg-gray-50 flex flex-col items-center transition-all duration-300 hover:scale-105"
                key={product.id}
              >
                <img src={product.image} alt={product.name} className="w-60 h-32 object-cover rounded-lg mb-4" />
                <h4 className="text-[20px] font-semibold uppercase text-blue-400 p-2 mt-4">{product.name}</h4>
                <p className="text-gray-700 text-lg text-center p-2 mt-4 font-bold">{product.price}$</p>
                <p className={`text-center p-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-bold`}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>

                <input
                  type="number"
                  value={selectedQuantity}
                  min={1}
                  max={product.stock}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="border p-2 w-16 text-center mb-4"
                />

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600"
                  disabled={product.stock <= 0}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <CustomerForm onSave={handleSaveCustomer} />
      )}
    </div>
  );
}

export default Home;
