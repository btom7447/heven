import React from "react";

const OrderShippingTab = ({ activeTab, onTabClick, tabData }) => {
    return (
        <div className="order-shipping-tab">
            <ul>
                {tabData.map((tab, index) => (
                    <li
                        key={index}
                        className={activeTab === tab.name ? "active" : ""}
                        onClick={() => onTabClick(tab.name)}
                    >
                        {tab.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderShippingTab;