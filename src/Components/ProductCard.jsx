import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaShoppingBasket, FaRegHeart, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "./ProductModal";

const ProductCard = ({ product, loading }) => {
    const controls = useAnimation();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleHoverStart = () => {
        controls.start((i) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" }
        }));
    };

    const handleHoverEnd = () => {
        controls.start({ y: 30, opacity: 0 });
    };

    const addItemToWishlist = (item) => {
        // Retrieve the wishlist from session storage or initialize an empty array
        const wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
    
        // Check by name to see if the product already exists in the wishlist
        if (!wishlist.some((existingItem) => existingItem.name === item.name)) {
            wishlist.push(item); 
            sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
            window.dispatchEvent(new Event("storageUpdate")); 
            toast.success("Item added to your wishlist!");
        } else {
            toast.warn("This item is already in your wishlist!"); // Warn if the product already exists by name
        }
    };    

    const addItemToCart = (item) => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
        // Check if the product already exists in the cart by comparing names
        const itemExists = cart.some((existingItem) => existingItem.name === item.name);
    
        if (!itemExists) {
            // Create a new item with a default quantity of 1
            const itemWithQuantity = { ...item, order_quantity: 1 };
            cart.push(itemWithQuantity); // Add to cart
            sessionStorage.setItem("cart", JSON.stringify(cart)); 
            window.dispatchEvent(new Event("storageUpdate")); 
            toast.success("Item added to your cart!");
        } else {
            toast.warn("This item is already in your cart!");
        }
    };    

    return (
        <>
            <div className="product-card">
                <div 
                    className="product" 
                    onMouseEnter={handleHoverStart} 
                    onMouseLeave={handleHoverEnd}
                >
                    <div className="product-image">
                        <img src={product.image[0]} alt={product.name} />
                    </div>

                    <div className="product-options">
                        <motion.button
                            type="button"
                            className="add-cart"
                            custom={0}  
                            animate={controls}
                            initial={{ y: 30, opacity: 0 }}
                            onClick={() => addItemToCart(product)}  
                        >
                            <FaShoppingBasket className="w-6 h-6 text-black" />
                        </motion.button>

                        <motion.button
                            type="button"
                            className="quick-view"
                            custom={1}  
                            animate={controls}
                            initial={{ y: 30, opacity: 0 }}
                            onClick={() => setModalOpen(true)}
                        >
                            <FaSearch className="w-6 h-6 text-black" />
                        </motion.button>

                        <motion.button
                            type="button"
                            className="save"
                            custom={2}  
                            animate={controls}
                            initial={{ y: 30, opacity: 0 }}
                            onClick={() => addItemToWishlist(product)}  
                        >
                            <FaRegHeart className="w-6 h-6 text-black" />
                        </motion.button>
                    </div>
                </div>

                <h5>{product.name}</h5>
                <h4>₦ {product.price.toLocaleString()}</h4>
            </div>

            {isModalOpen && (
                <ProductModal
                    product={product}
                    loading={loading}
                    onClose={() => setModalOpen(false)} 
                />
            )}
        </>
    );
};

export default ProductCard;