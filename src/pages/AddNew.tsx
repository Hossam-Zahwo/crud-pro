import React, { useState, useEffect } from "react";
import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";
import SearchandFilters from "../components/SearchandFilters";

// استرجاع البيانات من Local Storage
const getInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return [
    { id: 1, name: "T-shirt", price: 20, category: "Men", subCategory: "T-shirt", size: "M", stock: 10, inventoryId: 101, image: "" },
    { id: 2, name: "Jeans", price: 40, category: "Women", subCategory: "Pants", size: "L", stock: 15, inventoryId: 102, image: "/public/A60810002-detail1-pdp.webp" },
  ];
};

function AddNew() {
  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    subCategory: "",
    size: "",
    stock: 0,
    inventoryId: 0,
    image: "/public/",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categories = Array.from(new Set(products.map((product) => product.category))); // Unique categories

  // حفظ المنتجات في Local Storage كلما تم تحديث القائمة
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now(), inventoryId: Date.now() + 1000 }]);
  };

  const editProduct = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? { ...product } : p))
    );
    setIsEditing(false);
    setNewProduct({ id: 0, name: "", price: 0, category: "", subCategory: "", size: "", stock: 0, inventoryId: 0, image: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleAddClick = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.subCategory && newProduct.size && newProduct.stock) {
      if (isEditing) {
        editProduct(newProduct); // Edit product
      } else {
        addProduct(newProduct); // Add new product
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
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

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (selectedCategory ? product.category === selectedCategory : true)
  );

  const handleStockChange = (productId: number, change: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock + change) }
          : product
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product Management</h1>
      
      {/* Add Product Form */}
      <AddProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddClick={handleAddClick}
        handleImageUpload={handleImageUpload}
      />

      {/* Search and Filter Section */}
      <SearchandFilters
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        minPrice={minPrice}
        handleMinPriceChange={handleMinPriceChange}
        maxPrice={maxPrice}
        handleMaxPriceChange={handleMaxPriceChange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        deleteProduct={(id) => setProducts(products.filter((product) => product.id !== id))}
        setNewProduct={(product) => {
          setNewProduct(product);
          setIsEditing(true); // Set to edit mode when editing an existing product
        }}
        handleStockChange={handleStockChange}
      />
    </div>
  );
}

export default AddNew;
