// src/utils/localStorageUtils.ts

import { Product, initialProducts } from "../data/productData";

export const getInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return initialProducts;
};

export const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};
