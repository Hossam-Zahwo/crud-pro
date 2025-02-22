import React, { useState } from 'react';
import { Product } from '../data/productData'; // Import Product type

interface AddProductFormProps {
  newProduct: Product;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddClick: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  newProduct,
  handleInputChange,
  handleAddClick,
  handleImageUpload,
}) => {
  // استخدام useState لتخزين الفئات الفرعية
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

  // تصفية الفئات الفرعية بناءً على الفئة المختارة
  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.for.includes(newProduct.category)
  );

  // استخراج الفئات الفريدة من الفئات الفرعية
  const uniqueCategories = Array.from(
    new Set(subCategories.flatMap((subCategory) => subCategory.for))
  );

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="mb-6 p-6 border rounded-lg shadow-md bg-gray-50 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold w-full mb-4 text-gray-700 text-center">Add Product</h2>
      <div className="flex flex-col w-full justify-center items-center">
        <div className='grid grid-cols-3 gap-4 w-full'>
          {/* حقل اسم المنتج */}
          <div>
            <label className="block mb-2 text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* حقل السعر */}
          <div>
            <label className="block mb-2 text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* حقل سعر الجملة */}
          <div>
            <label className="block mb-2 text-gray-700">Wholesale Price</label>
            <input
              type="number"
              name="wholesalePrice"
              value={newProduct.wholesalePrice}
              onChange={handleInputChange}
              placeholder="Wholesale Price"
              className="border p-3 w-full rounded-lg"
            />
          </div>

    

          {/* حقل المخزون */}
          <div>
            <label className="block mb-2 text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* حقل الفئة */}
          <div>
            <label className="block mb-2 text-gray-700">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="border p-3 w-full rounded-lg"
            >
              <option value="">Select Category</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* حقل الفئة الفرعية */}
          <div>
            <label className="block mb-2 text-gray-700">Sub-Category</label>
            <select
              name="subCategory"
              value={newProduct.subCategory}
              onChange={handleInputChange}
              className="border p-3 w-full rounded-lg"
            >
              <option value="">Select Sub-Category</option>
              {filteredSubCategories.map((subCategory) => (
                <option key={subCategory.name} value={subCategory.name}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* حقل الحجم */}
          <div>
            <label className="block mb-2 text-gray-700">Size</label>
            <select
              name="size"
              value={newProduct.size}
              onChange={handleInputChange}
              className="border p-3 w-full rounded-lg"
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 gap-4 w-full">
          {/* حقل الصورة */}
          <div>
            <label className="block mb-2 text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* زر الإضافة */}
          <div className='flex justify-end items-end'>
            <button
              onClick={handleAddClick}
              className="mt-4 flex justify-center items-center bg-blue-500 text-white h-10 p-3 w-32 hover:bg-blue-600 rounded-lg"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
