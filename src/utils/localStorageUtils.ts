// src/utils/localStorageUtils.ts

import { Product, initialProducts } from "../data/productData"; // استيراد المنتجات الافتراضية

/**
 * استرجاع المنتجات من Local Storage أو المنتجات الافتراضية إذا لم تكن موجودة.
 */
export const getInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return initialProducts;
};

/**
 * حفظ قائمة المنتجات إلى Local Storage.
 */
export const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

/**
 * حفظ عملية بيع جديدة إلى Local Storage.
 */
export const saveSaleToLocalStorage = (sale: {
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}) => {
  const sales = JSON.parse(localStorage.getItem("sales") || "[]");
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));
};

/**
 * استرجاع جميع المبيعات من Local Storage.
 */
export const getSalesFromLocalStorage = (): {
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}[] => {
  return JSON.parse(localStorage.getItem("sales") || "[]");
};


/**
 * حذف جميع المبيعات من Local Storage.
 */
export const clearSalesFromLocalStorage = () => {
  localStorage.removeItem("sales");
};

/**
 * حذف جميع البيانات من Local Storage (للمنتجات والمبيعات).
 */
export const clearAllLocalStorage = () => {
  localStorage.removeItem("products");
  localStorage.removeItem("sales");
};
