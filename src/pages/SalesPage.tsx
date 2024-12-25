import { useState, useEffect } from "react";
import { FaHashtag } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  deletedTime: string;
  deletedDate: string;
  category: string;
  size: string;
  stock: number;
  inventoryId: number;
};

type Customer = {
    id: number;
    name: string;
    phone: string;
};

function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [Price, setPrice] = useState<string>("");
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>("All");

  // Fetch products from localStorage And Customer
  useEffect(() => {
    const savedProducts = localStorage.getItem("products-delete");
    let nameCustomer = localStorage.getItem("customer");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (nameCustomer) {
        try {
          const parsedCustomer = JSON.parse(nameCustomer);
          setCurrentCustomer(parsedCustomer); 
        } catch (e) {
          console.error("Failed to parse customer data:", e);
          setCurrentCustomer(null);
        }
      }
  }, []);

  // Return All Price
  const allPrice = () => {
    return products.reduce((total, product) => total + product.price, 0)
  }

  // Handle deletion of a product
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products-delete", JSON.stringify(updatedProducts));
  };

  // Filter products based on selected gender
  const filteredProducts = products.filter((product) => {
    return selectedGender === "All" || product.category === selectedGender;
  });

  return (
    <div className="container mx-auto pt-16">
      <div className="header">
        <h1 className="text-center text-3xl font-bold text-blue-600">Sales Page</h1>
      </div>

      <div className="filters">
        {/* Gender Filter */}
        <nav className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedGender("All")}
            className={`p-2 ${selectedGender === "All" ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
          >
            All
          </button>
          {["Men", "Women"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`p-2 ${selectedGender === gender ? "text-blue-600 font-bold" : "text-blue-500"} hover:text-blue-700`}
            >
              {gender}
            </button>
          ))}
        </nav>
      </div>

      <div className="products">
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products available for the selected filters.</p>
          ) : (
        <>
        <div className="price-products mb-4"><span className="font-semibold text-blue-500">All Price: </span>{allPrice()}$</div>
        <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-4">
        {
            filteredProducts.map((product) => (
              <div key={product.id} className="product-item relative p-4 border rounded-lg shadow-md bg-gray-50 flex flex-col items-center transition-all duration-300 hover:scale-105">
                <div className="current-name absolute right-[10px] top-[10px]"><span className="text-blue-500 font-semibold">Customer:</span> {currentCustomer ?  currentCustomer.name : "Guest"}</div>
                <div className="product-info flex items-center gap-[0.5rem] mb-1 flex-col">
                  <FaHashtag />
                  <h4 className="text-lg font-semibold text-blue-400 uppercase">{product.name}</h4>
                </div>
                <div className="product-description flex-1 mb-2">
                  <img className="w-[100px] mb-1" src={product.image}/>
                  <p className="text-gray-700 font-bold text-center">{product.price}$</p>
                </div>
                <div className="product-actions max-[767px]:w-full">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600  max-[767px]:w-full text-white p-2 m-1 rounded-lg hover:bg-red-500"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600  max-[767px]:w-full text-white p-2 m-1 rounded-lg hover:bg-blue-500"
                  >
                    View
                  </button>
                </div>
                <div className="data-and-time absolute top-[10px] left-[10px] text-[15px]">
                    <div className="tiem">
                        <div className="text-blue-500 font-semibold mr-1 inline-block">Time:</div>
                        <span className="">{product.deletedTime}</span>
                    </div>
                    <div className="date">
                        <div className="text-blue-500 font-semibold mr-1 inline-block">Date:</div>
                        <span className="">{product.deletedDate}</span>
                    </div>
                </div>
              </div>
            ))
        }
        </div>
        </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
