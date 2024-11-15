import React, { useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

const CartProductDetails = ({
    cartItems,
    setCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    fetchedProducts,
}) => {

    // Load cart from sessionStorage on initial render
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, [setCartItems]);

    // Helper to update cart both in state and sessionStorage
    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    
        // Emit custom event after updating cart
        const event = new Event("storageUpdate");
        window.dispatchEvent(event);
    };

    // Increase quantity of an item
    const handleIncrease = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id
                ? { ...item, order_quantity: item.order_quantity + 1 }
                : item
        );
        updateCart(updatedCart);
    };

    // Decrease quantity of an item or remove it if quantity is 0
    const handleDecrease = (id) => {
        const updatedCart = cartItems
            .map((item) =>
                item.id === id
                    ? { ...item, order_quantity: Math.max(item.order_quantity - 1, 0) }
                    : item
            )
            .filter((item) => item.order_quantity > 0); // Remove items with quantity 0
        updateCart(updatedCart);
    };

    // Calculate the total price for an item
    const calculateTotalPrice = (price, orderQuantity, discount = 0) => {
        const discountedPrice = price - price * discount;
        return discountedPrice * orderQuantity;
    };

    // Format price as currency
    const formatPrice = (price) => {
        return price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
        });
    };

    // Handle loading state when fetchedProducts is undefined
    if (!fetchedProducts) {
        return (
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
        );
    }

    return (
        <div className="cart-product-details">
            {cartItems.length === 0 ? (
                <div className="no-items-message">
                    <p>No Items in Cart</p>
                </div>
            ) : (
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cartItem) => {
                            // Check if the product exists in fetchedProducts before accessing
                            const product = fetchedProducts.find(
                                (prod) => prod.id === cartItem.id
                            );

                            if (!product) return null; // Return null if the product is not found

                            const { name, price, discount, image } = product;
                            const unitPrice = price - price * discount;
                            const totalPrice = calculateTotalPrice(
                                price,
                                cartItem.order_quantity,
                                discount
                            );

                            return (
                                <tr key={cartItem.id}>
                                    <td>
                                        <div className="product-info">
                                            <img
                                                src={image[0]}
                                                alt={name}
                                                className="product-image"
                                            />
                                            <span>{name}</span>
                                        </div>
                                    </td>
                                    <td className="unit-price">{formatPrice(unitPrice)}</td>
                                    <td>
                                        <div className="add-cart">
                                            <button
                                                type="button"
                                                className="order-btn"
                                                onClick={() => handleDecrease(cartItem.id)}
                                            >
                                                <MinusIcon className="w-6 h-6 text-black" />
                                            </button>
                                            <span>{cartItem.order_quantity}</span>
                                            <button
                                                type="button"
                                                className="order-btn"
                                                onClick={() => handleIncrease(cartItem.id)}
                                            >
                                                <PlusIcon className="w-6 h-6 text-black" />
                                            </button>
                                        </div>
                                    </td>
                                    <td>{formatPrice(totalPrice)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="cancel-order"
                                            onClick={() => handleDecrease(cartItem.id)}
                                        >
                                            <XMarkIcon className="w-6 h-6 text-black" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CartProductDetails;