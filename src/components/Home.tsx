import React, { useState } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import SearchandFilters from "./SearchandFilters";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  stock: number;
  inventoryId: number; // لكل منتج في المخزون id مختلف
}

const initialProducts: Product[] = [
  { id: 1, name: "T-shirt", description: "test description 1", price: 20, category: "Men", size: "M", stock: 10, inventoryId: 101 },
  { id: 2, name: "Jeans", description: "test description 2", price: 40, category: "Women", size: "L", stock: 15, inventoryId: 102 },
];

function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    stock: 0,
    inventoryId: 0,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

  // Add Product
  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now(), inventoryId: Date.now() + 1000 }]);
  };

  // Edit Product
  const editProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Delete Product
  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle Change for New Product Form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleAddClick = () => {
    if (newProduct.name && newProduct.price && newProduct.description && newProduct.category && newProduct.size && newProduct.stock) {
      addProduct(newProduct);
      setNewProduct({ id: 0, name: "", description: "", price: 0, category: "", size: "", stock: 0, inventoryId: 0 }); // Reset the form
    } else {
      alert("Please fill all fields");
    }
  };

  // Handle Search Query Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle Price Filter Change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseFloat(e.target.value) || 0);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseFloat(e.target.value) || Infinity);
  };

  // Filter products based on search query and price range
  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  // Storage Products in Loacl S
  localStorage.setItem("products", JSON.stringify(filteredProducts));

  console.log(filteredProducts);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="p-4 w-full max-w-screen-lg rounded-lg shadow-md flex flex-col bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Clothing Store CRUD</h1>
        
        {/* Add Product Form */}
        <div className="mb-6 p-6 border rounded-lg shadow-md bg-gray-50 w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="border p-3 mb-4 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Product Description</label>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                className="border p-3 mb-4 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="border p-3 mb-4 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="border p-3 mb-4 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Category</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="border p-3 mb-4 w-full"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Size</label>
              <select
                name="size"
                value={newProduct.size}
                onChange={handleInputChange}
                className="border p-3 mb-4 w-full"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white p-3 w-full hover:bg-blue-600 rounded-lg"
          >
            Add Product
          </button>
        </div>
  
        {/* Search and Filters */}
      <SearchandFilters  
      searchQuery={searchQuery}
      minPrice={minPrice}
      maxPrice={maxPrice}
      handleSearchChange={handleSearchChange}
      handleMinPriceChange={handleMinPriceChange}
      handleMaxPriceChange={handleMaxPriceChange}

      />
  
        {/* Product List */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Product List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg shadow-md bg-gray-50 flex flex-col"
              >
                <div className="mb-4 text-gray-700">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <p>{product.category}</p>
                  <p>Size: {product.size}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Inventory ID: {product.inventoryId}</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 m-1 hover:bg-red-600 flex justify-center items-center rounded-lg"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <button
                    onClick={() => setNewProduct(product)}
                    className="bg-yellow-500 text-white p-2 m-1 hover:bg-yellow-600 flex justify-center items-center rounded-lg"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Home;
