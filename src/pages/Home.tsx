import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Import Header
import CustomerCart from "../components/CustomerCart"; // Import CustomerCart
import CustomerForm, { Customer } from "../components/CustomerForm"; // Import CustomerForm
import { FaHashtag } from "react-icons/fa"; // Import FaHashtag for icon
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

  const [products, setProducts] = useState<Product[]>(getInitialProducts());
  const [customerPurchases, setCustomerPurchases] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to manage the selected product for view
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null); // State to manage product for editing
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null); // State to manage customer data
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false); // State to control customer form display
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString()); // State to store current date

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

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return searchMatch;
  });

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
    setCustomerPurchases([...customerPurchases, product]); // Add product to customer purchases
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedPurchases = customerPurchases.filter(product => product.id !== productId);
    setCustomerPurchases(updatedPurchases); // Remove product from customer purchases
  };

  const handleSaveCustomer = (customer: Customer) => {
    setCustomer(customer); // Save customer data
  };

  return (
    <div className="container mx-auto pt-16 flex">
      {/* Customer Cart Section */}
      <div className="w-1/4 p-4 bg-gray-100 shadow-md">
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

      <div className="content w-3/4 p-4">
        <Header 
          searchQuery={debouncedSearchQuery} 
          setSearchQuery={setDebouncedSearchQuery} // Pass search query handler to header
          onSaveCustomer={handleSaveCustomer} // Pass handleSaveCustomer to header
        />

        {/* Product List Section */}
        <section className="pt-8 pb-8 w-full">
          <div className="products grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                className="item p-4 border rounded-lg shadow-md bg-gray-50 flex flex-col items-center transition-all duration-300 hover:scale-105"
                key={product.id}
              >
                <div className="flex flex-col items-center">
                  <FaHashtag className="text-blue-400 mb-2" />
                  <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-4"/>
                  <h4 className="text-[20px] font-semibold uppercase text-blue-400">{product.name}</h4>
                </div>
                <p className="text-gray-700 text-lg capitalize text-center">{product.description}</p>
                <p className="text-gray-700 text-lg text-center">{product.price}$</p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-2 mt-4 w-full hover:bg-blue-600 rounded-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white p-2 mt-2 w-full hover:bg-red-600 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white p-2 mt-2 w-full hover:bg-yellow-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleView(product)}
                  className="bg-green-500 text-white p-2 mt-2 w-full hover:bg-green-600 rounded-lg"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center text-blue-600">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover my-4" />
            <p>{selectedProduct.description}</p>
            <p className="font-semibold text-lg mt-4">{selectedProduct.price}$</p>
            <button
              onClick={handleCancelView}
              className="bg-gray-500 text-white p-2 mt-4 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {selectedProductForEdit && (
        <div className="fixed z-50 inset-0  bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center text-blue-600">Edit Product</h2>
            <AddProductForm
              newProduct={selectedProductForEdit}
              handleInputChange={() => {}}
              handleAddClick={() => {}}
              handleImageUpload={() => {}}
            />
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white p-2  rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <CustomerForm onSave={handleSaveCustomer} />
      )}
    </div>
  );
}

export default Home;
