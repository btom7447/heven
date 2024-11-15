import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import CartProductDetails from "../Components/CartProductDetails";
import CartShipping from "../Components/CartShipping";
import { BounceLoader } from "react-spinners";
import image from "../Assets/Images/cart-breadcrumb.jpg";
import BreadCrumb from "../Components/BreadCrumb";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const CartPage = ({ loading }) => {
    const [fetchedProducts, setFetchedProducts] = useState([]); // Fetch products in this component
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setLoadingProducts(true);
        base("Products")
            .select({ view: "Grid view" })
            .all()
            .then((records) => {
                const products = records.map((record) => ({
                    id: record.id,
                    name: record.fields.product_name,
                    price: record.fields.price,
                    discount: record.fields.discount || 0,
                    description: record.fields.product_description,
                    quantity: record.fields.stock_quantity,
                    categories: record.fields.product_category_name || [],
                    gender: record.fields.gender || [],
                    featured: record.fields.featured_product,
                    image: record.fields.images
                        ? record.fields.images.map((img) => img.url)
                        : [],
                }));
                setFetchedProducts(products);
                setLoadingProducts(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoadingProducts(false);
            });
    }, []); // Fetch products only once when component mounts

    useEffect(() => {
        // Load cart from sessionStorage on initial render
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // Helper to update cart both in state and sessionStorage
    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id
                ? { ...item, order_quantity: item.order_quantity + 1 }
                : item
        );
        updateCart(updatedCart);
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItems
            .map((item) =>
                item.id === id
                    ? { ...item, order_quantity: Math.max(item.order_quantity - 1, 0) }
                    : item
            )
            .filter((item) => item.order_quantity > 0); // Remove items with quantity 0
        updateCart(updatedCart);
    };

    return (
        <div className="cart-page">
            <BreadCrumb name="Shopping Cart" image={image} />
            {loading || loadingProducts ? (
                <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <BounceLoader size={80} color="#cfac9f" />
                </div>
            ) : (
                <>
                    <CartProductDetails
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        fetchedProducts={fetchedProducts} // Pass fetched products here
                    />
                    <CartShipping cartItems={cartItems} />
                </>
            )}
        </div>
    );
};

export default CartPage;