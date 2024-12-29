import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { saveProductsToLocalStorage } from '../utils/localStorageUtils'; // Import save function
import { Product } from '../data/productData'; // Import Product type

interface ProductListProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  setNewProduct: (product: Product) => void;
  handleStockChange: (productId: number, change: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  deleteProduct,
  setNewProduct,
  handleStockChange
}) => {

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
    saveProductsToLocalStorage(products.filter(product => product.id !== id)); // Update localStorage
  };

  const handleStockChangeWithSave = (productId: number, change: number) => {
    handleStockChange(productId, change);
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, stock: product.stock + change } : product
    );
    saveProductsToLocalStorage(updatedProducts); // Update localStorage
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-[1px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow-md bg-gray-50 flex flex-col w-[270px] md:w-[370px] mx-auto"
          >
            <div className="mb-4 text-gray-700">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p>${product.price}</p>
              {/* عرض سعر الجملة */}
              <p className="text-gray-500">Wholesale Price: ${product.wholesalePrice}</p>
              <p>{product.category}</p>
              <p>Size: {product.size}</p>
              <p>Stock: {product.stock}</p>
              <p>Inventory ID: {product.inventoryId}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStockChangeWithSave(product.id, -1)} // Decrease stock
                className="bg-yellow-500 text-white p-2 flex justify-center items-center rounded-lg w-full sm:w-auto"
              >
                Decrease Stock
              </button>
              <button
                onClick={() => handleStockChangeWithSave(product.id, 1)} // Increase stock
                className="bg-blue-500 text-white p-2 flex justify-center items-center rounded-lg w-full sm:w-auto"
              >
                Increase Stock
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white p-2 flex justify-center items-center rounded-lg w-full sm:w-auto"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
              <button
                onClick={() => setNewProduct(product)}
                className="bg-green-500 text-white p-2 flex justify-center items-center rounded-lg w-full sm:w-auto"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
