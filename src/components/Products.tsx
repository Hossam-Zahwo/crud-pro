import { FaHashtag } from "react-icons/fa";


type Product  = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    size: string;
    stock: number;
    inventoryId: number;
}


function Products() {
    const products = localStorage.getItem("products");
    let currentProducts: Product[] = [];
    if (products !== null){
        currentProducts = JSON.parse(products) as Product[];
    } else{
        console.log("Data Is Not Found Now");
    }
    return(
        <section className="pt-8 pb-8 w-full">
            <div className="products">
                <h1 className="text-center mb-[15px] text-blue-600 text-[35px] font-bold ">Show Products</h1>
                <div className="item-products pl-4 pr-4">
                    {
                        currentProducts.map((product) => {
                            return(
                                <div className="item flex items-center p-3 mb-[10px] max-[767px]:flex-col max-[767px]:items-start bg-slate-300" key={product.id}>
                                    <div className="flex gap-[1rem] mr-4 items-center">
                                    <FaHashtag />
                                    <h4 className="text-[20px] font-semibold uppercase text-blue-400">{product.name}</h4>
                                    </div>
                                    <p className="text-gray-700 flex-1 text-lg capitalize">{product.description}</p>
                                    <p className="text-gray-700 mr-3 text-lg">{product.price}$</p>
                                    {/* <p className="text-gray-700 ">{product.category}</p> */}
                                    {/* <p className="text-gray-700 ">Size: {product.size}</p> */}
                                    {/* <p className="text-gray-700 ">Stock: {product.stock}</p> */}
                                    {/* <p className="text-gray-700 ">ID: {product.inventoryId}</p> */}
                                    <button className="bg-red-500 text-white p-2 m-1 hover:bg-red-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">Delete</button>
                                    <button className="bg-yellow-500 text-white p-2 m-1 hover:bg-yellow-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">Edit</button>
                                    <button className="bg-green-500 text-white p-2 m-1 hover:bg-green-600 flex justify-center items-center rounded-lg transition-all max-[767px]:w-full">View</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default Products;