'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { decryptData } from '@/utils/encryption';
// import { Product } from "@/types/types";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()
    const siteUrl = process.env.NEXT_PUBLIC_WC_SITE_URL;

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [cartItems, setCartItems] = useState({})
     const [popOverOpen, setPopOverOpen] = useState(false);

    // const fetchProductData = async () => {
    //     setProducts(productsDummyData)
    // }

    const fetchProductData = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();

        const mappedProducts = data.map(product => (
            {
                _id: String(product.id),
                name: product.name,
                description: product.description,
                price: Number(product.regular_price),
                offerPrice: Number(product.sale_price || product.price),
                image: product.images.map(img => img.src),
                category: product.categories[0]?.name || "Uncategorized",
                stock: product.stock_status,
                rating: product.average_rating,
                reviews: product.review_count,
                brand: product.brands,
                attributes: product.attributes,
                average_rating: product.average_rating,
                video : product.short_description ? product.short_description.match(/src="([^"]+)"/)?.[1] : null,
            }));
        setProducts(mappedProducts);
    };

    // const fetchUserData = async () => {
    //     // setUserData(userDummyData);
    // }
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const encryptedUser = localStorage.getItem('token');
        if (encryptedUser) {
            try {
                const user = decryptData(encryptedUser);
                setUserData(user);
            } catch (err) {
                console.error('Invalid user data', err);
                localStorage.removeItem('token');
                localStorage.removeItem('jwtToken');
            }
        }
    };


    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        currency, router,
        userData, setUserData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        setPopOverOpen,popOverOpen
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
