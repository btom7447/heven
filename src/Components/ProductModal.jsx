import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { BounceLoader } from "react-spinners";
import { toast } from 'react-toastify';

const ProductModal = ({ loading, product, onClose }) => {
    const [order_quantity, setOrderQuantity] = useState(1);

    useEffect(() => {
        // Fetch the product's order quantity from sessionStorage (if it exists)
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        
        // Check if the product exists in cart and get its order quantity
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            setOrderQuantity(cartItem.order_quantity);
        }
    }, [product.id]);

    // Reset quantity to 1 when modal closes unless there's a stored value
    const handleModalClose = () => {
        // Reset to 1 unless there's a quantity stored in sessionStorage for this product
        setOrderQuantity(prevQuantity => (prevQuantity === 1 ? 1 : prevQuantity));
        onClose();
    };

    const handleIncreaseQuantity = () => {
        setOrderQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (order_quantity > 1) {
            setOrderQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addItemToCart = () => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        // Check if the product exists in the cart
        const itemExists = cart.some(item => item.id === product.id);

        if (!itemExists) {
            // If the product is not in the cart, add it with the selected quantity
            const newItem = { ...product, order_quantity };
            cart.push(newItem);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Product added to your cart!");
        } else {
            // If the product is already in the cart, update the quantity
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, order_quantity } : item
            );
            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product quantity updated in your cart!");
        }
    };

    const addItemToWishlist = () => {
        const wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];

        // Check if product already exists in the wishlist
        const itemExists = wishlist.some(item => item.name === product.name);

        if (!itemExists) {
            wishlist.push(product);
            sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
            toast.success("Product added to your wishlist!");
        } else {
            toast.warn("This product is already in your wishlist!");
        }
    };

    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <BounceLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    return ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={handleModalClose}>
            <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            >
                <button className='close-btn' onClick={handleModalClose}>
                    <XMarkIcon className="w-6 h-6 text-black" />
                </button>
                <div className="product-detail">
                    <img src={product.image[0]} alt={product.name} style={{ width: "100%" }} />
                    <div>
                        <h2>{product.name}</h2>
                        <h5>₦ {product.price.toLocaleString()}</h5>
                        <p>{product.description}</p>
                        <div className="add-cart">
                            <button type="button" className="order-btn" onClick={handleDecreaseQuantity}>
                                <MinusIcon className="w-6 h-6 text-black" />
                            </button>
                            <span>{order_quantity}</span>
                            <button type="button" className="order-btn" onClick={handleIncreaseQuantity}>
                                <PlusIcon className="w-6 h-6 text-black" />
                            </button>
                            <button type="button" className="add" onClick={addItemToCart}>
                                Add to cart
                            </button>
                            <button type="button" className="save-btn" onClick={addItemToWishlist}>
                                <FaRegHeart className="w-6 h-6 text-black" />
                            </button>
                        </div>
                        <h6>Categories: {product.categories.join(", ")}</h6>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body // Portal target to render outside of parent component
    );
};

export default ProductModal;