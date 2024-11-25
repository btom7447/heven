import React, { useState } from "react";
import Select from "react-select";
import nigeriaData from "../Data/states-and-cities.json";

const CartShipping = ({ cartItems }) => {
    const [statesOptions] = useState(
        nigeriaData.map((state) => ({
            label: state.name,
            value: state.name,
        }))
    );
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption.value);

        const stateData = nigeriaData.find((state) => state.name === selectedOption.value);

        setCityOptions(
            stateData?.cities.map((city) => ({
                label: city,
                value: city,
            })) || []
        );
    };

    const handleCityChange = (option) => {
        setSelectedCity(option.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // Calculate subtotal
    const subTotal = cartItems.reduce((acc, item) => {
        // Ensure price, discount, and order_quantity exist and are valid
        const price = item.price || 0; // Default to 0 if price is invalid
        const discount = item.discount || 0; // Default to 0 if discount is invalid
        const orderQuantity = item.order_quantity || 0; // Default to 0 if quantity is invalid

        // Validate that the price and quantity are valid numbers
        if (typeof price === "number" && typeof orderQuantity === "number") {
            const productPrice = price - price * discount;
            return acc + productPrice * orderQuantity;
        }
        return acc; // Return accumulated value if any item has invalid data
    }, 0);

    const delivery = 3000;

    // Calculate grand total
    const grandTotal = subTotal + delivery;

    const formatPrice = (price) => {
        return price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
        });
    };

    return (
        <div className="shipping-container">
            <div className="cart-shipping">
                <div className="total-caption">
                    <h5>Delivery</h5>
                </div>
                <h5>Delivery Contacts</h5>
                <div className="form-group">
                    <p>{name ? `Name: ${name}` : <span className="dud"></span>}</p>
                    <p>{phone ? `Phone: ${phone}` : <span className="dud"></span>}</p>
                </div>
                <br /><br />
                <h5>Delivery Address</h5>
                <p>
                    {address && selectedCity && selectedState
                        ? `Address: ${address}, ${selectedCity}, ${selectedState}`
                        : <span className="dud">Enter Address</span>}
                </p>
                <br /><br />
                <h5>Change Address</h5>

                {/* Name Input */}
                <div className="form-group">
                    <label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter your name"
                            required
                        />
                    </label>

                    <label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </label>
                    <label className="address-input">
                        <input
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your Address"
                            required
                        />
                    </label>
                    <label>
                        <Select
                            options={statesOptions}
                            onChange={handleStateChange}
                            placeholder="Select a state"
                            className="cart-select"
                            classNames={{
                                control: () => 'react-select__control',
                                option: () => 'react-select__option',
                                menu: () => 'react-select__menu',
                                menuList: () => 'react-select__menu-list',
                                multiValue: () => 'react-select__multi-value',
                                multiValueLabel: () => 'react-select__multi-value__label',
                                multiValueRemove: () => 'react-select__multi-value__remove',
                                placeholder: () => 'react-select__placeholder',
                                dropdownIndicator: () => 'react-select__dropdown-indicator',
                            }}
                        />
                    </label>
                    <label>
                        <Select
                            options={cityOptions}
                            onChange={handleCityChange}
                            placeholder="Select a state first"
                            isDisabled={!cityOptions.length}
                            className="cart-select"
                            classNames={{
                                control: () => 'react-select__control',
                                option: () => 'react-select__option',
                                menu: () => 'react-select__menu',
                                menuList: () => 'react-select__menu-list',
                                multiValue: () => 'react-select__multi-value',
                                multiValueLabel: () => 'react-select__multi-value__label',
                                multiValueRemove: () => 'react-select__multi-value__remove',
                                placeholder: () => 'react-select__placeholder',
                                dropdownIndicator: () => 'react-select__dropdown-indicator',
                            }}
                        />
                    </label>
                </div>
            </div>
            <div className="total-container">
                <div className="total-caption">
                    <h5>Total</h5>
                </div>
                <div className="total-calculation">
                    <div className="calculate">
                        <h6>Subtotal: </h6> <h6>{formatPrice(subTotal)}</h6>
                    </div>
                    <div className="calculate">
                        <h6>Delivery:</h6> <h6>{formatPrice(delivery)}</h6>
                    </div>
                    <div className="calculate">
                        <h5>Grand Total:</h5> <h5>{formatPrice(grandTotal)}</h5>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartShipping;