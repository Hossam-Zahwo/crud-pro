// src/data/productData.ts

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  size: string;
  stock: number;
  inventoryId: number;
  image: string;
};

export const initialProducts: Product[] = [
  { id: 1, name: "T-shirt", price: 20, category: "Men", subCategory: "T-shirt", size: "M", stock: 10, inventoryId: 101, image: "" },
  { id: 2, name: "Jeans", price: 40, category: "Women", subCategory: "Pants", size: "L", stock: 15, inventoryId: 102, image: "/public/A60810002-detail1-pdp.webp" },
];
