import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  size: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "T-shirt", price: 20, category: "Men", size: "M" },
  { id: 2, name: "Jeans", price: 40, category: "Women", size: "L" },
];

function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    size: "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

  // Add Product
  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
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
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleAddClick = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.size) {
      addProduct(newProduct);
      setNewProduct({ id: 0, name: "", price: 0, category: "", size: "" }); // Reset the form
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="p-4 max-w-max w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Clothing Store CRUD</h1>
        <div className="flex flex-col justify-center items-center mb-4">
          {/* Add Product Form */}
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 h-72">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border p-2 mb-2 w-full"
            />
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
            <select
              name="size"
              value={newProduct.size}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button
              onClick={handleAddClick}
              className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-4">
          {/* Search Bar */}
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or category"
              className="border p-2 mb-2 w-full"
            />
          </div>

          {/* Price Filter */}
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 h-72 w-full">
            <div className="mb-2">
              <label className="block text-gray-700">Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="border p-2 w-full"
                placeholder="Min Price"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Max Price:</label>
              <input
                type="number"
                value={maxPrice === Infinity ? "" : maxPrice}
                onChange={handleMaxPriceChange}
                className="border p-2 w-full"
                placeholder="Max Price"
              />
            </div>
          </div>
        </div>

        {/* Product List */}
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex items-center mb-4 p-4 border rounded-lg shadow-md bg-gray-50">
              <span className="flex-1 text-gray-700">{product.name}</span>
              <span className="flex-1 text-gray-700">${product.price}</span>
              <span className="flex-1 text-gray-700">{product.category}</span>
              <span className="flex-1 text-gray-700">{product.size}</span>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white p-2 ml-2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
