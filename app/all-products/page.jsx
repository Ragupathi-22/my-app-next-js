// 'use client'
// import ProductCard from "@/components/ProductCard";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useAppContext } from "@/context/AppContext";

// const AllProducts = () => {

//     const { products } = useAppContext();

//     return (
//         <>
//             {/* <Navbar /> */}
//             <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
//                 <div className="flex flex-col items-end pt-12">
//                     <p className="text-2xl font-medium">All products</p>
//                     <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
//                     {products.map((product, index) => <ProductCard key={index} product={product} />)}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default AllProducts;

'use client'
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
    const { products } = useAppContext();

    // Step 1: Get all unique categories
    const categorizedProducts: { [category: string]: any[] } = {};
    products.forEach((product) => {
        const category = product.category || "Uncategorized";
        if (!categorizedProducts[category]) {
            categorizedProducts[category] = [];
        }
        categorizedProducts[category].push(product);
    });

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All Products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                {/* First Row: All Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 w-full">
                    {products.map((product, index) => (
                        <ProductCard key={`all-${index}`} product={product} />
                    ))}
                </div>

                {/* From second row onwards: Category-wise */}
                {Object.entries(categorizedProducts).map(([category, items]) => (
                    <div key={category} className="mt-16 w-full">
                        <p className="text-xl font-semibold mb-4">{category}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {items.map((product, index) => (
                                <ProductCard key={`${category}-${index}`} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;

