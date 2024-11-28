import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Airtable from "airtable";
import CartProductDetails from "../Components/CartProductDetails";
import CartShipping from "../Components/CartShipping";
import { BounceLoader } from "react-spinners";
import image from "../Assets/Images/cart-breadcrumb.jpg";
import BreadCrumb from "../Components/BreadCrumb";
import NewsLetter from "../Components/NewsLetter";
import CouponSection from "../Components/CoupounSection";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const CartPage = ({ loading }) => {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [fetchedCoupons, setFetchedCoupons] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    // Fetch products from Airtable
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
    }, []);

    // Fetch coupons
    useEffect(() => {
        base("Coupon")
            .select({ view: "Grid view" })
            .all()
            .then((records) => {
                const coupons = records.map((record) => ({
                    id: record.id,
                    code: record.fields.coupon_code,
                    discountPercent: record.fields.coupon_discount,
                    limit: record.fields.coupon_limit,
                    startDate: record.fields.start_date,
                    endDate: record.fields.end_date,
                }));
                setFetchedCoupons(coupons);
            })
            .catch((err) => console.error("Error fetching coupons:", err));
    }, []);

    // Load cart from sessionStorage
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // Update cart in state and sessionStorage
    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const applyCoupon = (couponCode) => {
        const coupon = fetchedCoupons.find((c) => c.code === couponCode);
    
        if (!coupon) {
            toast.error("Sorry, code expired or invalid.", {
                autoClose: 3000,
            });
            return;
        }
    
        const today = new Date();
        const startDate = new Date(coupon.startDate);
        const endDate = new Date(coupon.endDate);
    
        // Format start date to a user-friendly format
        const formattedStartDate = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(startDate);
    
        if (today < startDate || today > endDate) {
            toast.error(`Coupon coming soon - ${formattedStartDate}.`, {
                autoClose: 3000,
            });
            return;
        }
    
        // Set the coupon discount value only, not the entire coupon object
        setAppliedCoupon(coupon);
        toast.success("Success! Your discount has been applied.", {
            autoClose: 3000,
        });
    };    

    // Handle quantity changes
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
                <div
                    className="loading-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <BounceLoader size={80} color="#cfac9f" />
                </div>
            ) : (
                <>
                    <CartProductDetails
                        cartItems={cartItems}
                        setCartItems={setCartItems} 
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        fetchedProducts={fetchedProducts}
                    />
                    <CouponSection
                        applyCoupon={applyCoupon}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        appliedCoupon={appliedCoupon}
                    />
                    <CartShipping
                        cartItems={cartItems}
                        appliedCoupon={appliedCoupon}
                    />
                    <NewsLetter />
                </>
            )}
        </div>
    );
};

export default CartPage;