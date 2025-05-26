'use client'

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading"; // Your loading component
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
    const { products } = useAppContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products && products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    const categoryList = ["Shirt", "T-Shirt", "Accessories", "Earphone"];

    // Group products by category without excluding duplicates
    const categoryMap = useMemo(() => {
        if (!products || products.length === 0) return {};

        const map = {};

        for (const category of categoryList) {
            const filtered = products.filter(product => product.category === category);
            if (filtered.length > 0) {
                map[category] = filtered;
            }
        }

        return map;
    }, [products]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                {/* Page Title */}
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All Products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                {/* First Row: All Products with horizontal scroll */}
                <div className="overflow-x-auto w-full mt-12">
                    <div className="flex space-x-4 min-w-max">
                        {products.map((product, index) => (
                            <div key={`all-${index}`} className="flex-shrink-0 w-48">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category-wise Products with horizontal scroll */}
                {categoryList.map(category => {
                    const categoryProducts = categoryMap[category];
                    if (!categoryProducts) return null;

                    return (
                        <div key={category} className="w-full mt-12">
                            <h2 className="text-xl font-semibold mb-4">{category}</h2>
                            <div className="overflow-x-auto w-full">
                                <div className="flex space-x-4 min-w-max">
                                    {categoryProducts.map((product, idx) => (
                                        <div key={`${category}-${idx}`} className="flex-shrink-0 w-48">
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

            <Footer />
        </>
    );
};

export default AllProducts;
