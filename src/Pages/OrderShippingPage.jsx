import React, { useState } from "react";
import OrderShippingTab from "../Components/OrderShippingTab";
import OrderShippingDisplay from "../Components/OrderShippingDisplay";
import tabData from "../Data/order-shipping.json"
import NewsLetter from "../Components/NewsLetter";
import BreadCrumb from "../Components/BreadCrumb";
import image from "../Assets/Images/order breadcrumb.jpg"

const OrderShippingContainer = () => {
    const [activeTab, setActiveTab] = useState(tabData[0].name); // Default to the first tab

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="cart-page">
            <BreadCrumb name="Order & Shipping" image={image} />
            <div className="order-shipping-container">
            <OrderShippingTab
                activeTab={activeTab}
                onTabClick={handleTabClick}
                tabData={tabData}
            />
            <OrderShippingDisplay 
                activeTab={activeTab} 
                tabData={tabData} 
            />
            </div>
            <NewsLetter />
        </div>
    );
};

export default OrderShippingContainer;