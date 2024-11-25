import React, { useState } from "react";
import { FaShoppingBasket, FaSearchPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "./ProductModal";
import { XMarkIcon } from "@heroicons/react/24/solid";

const WishCard = ({ product, loading, setWishlist }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const addItemToCart = (item) => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const itemExists = cart.some((existingItem) => existingItem.name === item.name);

        if (!itemExists) {
            const itemWithQuantity = { ...item, order_quantity: 1 };
            cart.push(itemWithQuantity);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            window.dispatchEvent(new Event("storageUpdate"));
            toast.success("Item added to your cart!");
        } else {
            toast.warn("This item is already in your cart!");
        }
    };

    const removeWishItem = (item) => {
        const wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
        const updatedWishlist = wishlist.filter((wishItem) => wishItem.id !== item.id);

        sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist); // Update parent state immediately
        window.dispatchEvent(new Event("storageUpdate")); // Notify other components
        toast.error("Item removed from your wishlist.");
    };

    return (
        <>
            <div className="wish-card">
                <div className="product">
                    <div className="product-image">
                        <img src={product.image[0]} alt={product.name} />
                    </div>
                    {product.discount && (
                        <div className="discount-box">
                            {`- ${(product.discount * 100).toFixed(0)}%`}
                        </div>
                    )}
                </div>

                <h5>{product.name}</h5>
                <div className="product-prices">
                    {product.discount ? (
                        <>
                            <h4 className="original-price">
                                ₦ {product.price.toLocaleString()}
                            </h4>
                            <h4 className="discounted-price">
                                ₦ {(product.price * (1 - product.discount)).toLocaleString()}
                            </h4>
                        </>
                    ) : (
                        <h4 className="normal-price">₦ {product.price.toLocaleString()}</h4>
                    )}
                </div>
                <div className="product-options">
                    <button
                        type="button"
                        className="add-cart"
                        onClick={() => addItemToCart(product)}
                    >
                        <FaShoppingBasket className="w-6 h-6 text-black" />
                    </button>

                    <button
                        type="button"
                        className="quick-view"
                        onClick={() => setModalOpen(true)}
                    >
                        <FaSearchPlus className="w-6 h-6 text-black" />
                    </button>

                    <button
                        type="button"
                        className="remove-wish"
                        onClick={() => removeWishItem(product)}
                    >
                        <XMarkIcon className="w-6 h-6 text-black" />
                    </button>
                </div>
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

export default WishCard;