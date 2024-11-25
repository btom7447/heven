import dutiesTaxImg from "../Assets/Images/duties-tax.jpg";
import shippingImg from "../Assets/Images/shipping.jpg";
import sameDayDeliveryImg from "../Assets/Images/same-day-delivery.jpg";
import orderTrackingImg from "../Assets/Images/order-tracking.jpg";
import orderCancellationImg from "../Assets/Images/order-cancellation.jpg";
import customizedItemImg from "../Assets/Images/customized-item.jpg";

const OrderShippingDisplay = ({ activeTab, tabData }) => {
    const imageMap = {
        "Duties & Tax": dutiesTaxImg,
        "Shipping": shippingImg,
        "Same Day Delivery": sameDayDeliveryImg,
        "Order Tracking": orderTrackingImg,
        "Cancellations": orderCancellationImg,
        "Customized Items": customizedItemImg,
    };

    const activeTabContent = tabData.find((tab) => tab.name === activeTab);

    if (!activeTabContent) {
        return <p>No content available for the selected tab.</p>;
    }

    const { text } = activeTabContent;

    return (
        <div className="order-shipping-display">
            {imageMap[activeTab] && (
                <img
                    src={imageMap[activeTab]}
                    alt={`${activeTab} Illustration`}
                    className="tab-image"
                />
            )}
            {text.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};

export default OrderShippingDisplay;