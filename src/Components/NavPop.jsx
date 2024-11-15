import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { FaHeart, FaShoppingBasket, FaUser } from "react-icons/fa";

const NavPop = ({ user, setUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    // Update wishlist and cart counts
    const updateCounts = () => {
        const wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setWishlistCount(wishlist.length);
        setCartCount(cart.length);
    };

    useEffect(() => {
        updateCounts();
    
        // Listen for custom 'storageUpdate' events
        const handleStorageUpdate = () => updateCounts();
        window.addEventListener("storageUpdate", handleStorageUpdate);
    
        // Clean up event listener on unmount
        return () => window.removeEventListener("storageUpdate", handleStorageUpdate);
    }, []);

    const handleUserClick = () => {
        if (user) {
            navigate("/user");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleCartClick = () => {
        if (user) {
            navigate("/cart"); // Redirect to cart page if logged in
        } else {
            setIsModalOpen(true); // Show login modal if not logged in
        }
    };

    return (
        <div className="nav-pops">
            <FaUser className="icon profile-icon w-6 h-6 text-black" onClick={handleUserClick} />

            {/* Wishlist Icon with Count Bubble */}
            <div className="icon-container">
                <FaHeart className="icon heart-icon w-6 h-6 text-black" />
                {wishlistCount > 0 && (
                    <span className="bubble">{wishlistCount}</span>
                )}
            </div>

            {/* Cart Icon with Count Bubble */}
            <div className="icon-container">
                <FaShoppingBasket
                    className="icon cart-icon w-6 h-6 text-black"
                    onClick={handleCartClick}
                />
                {cartCount > 0 && (
                    <span className="bubble">{cartCount}</span>
                )}
            </div>

            <AuthModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} setUser={setUser} />
        </div>
    );
};

export default NavPop;