import React from "react";
import { GiftIcon } from "@heroicons/react/24/solid";

const CouponSection = ({ 
    applyCoupon, 
    couponCode, 
    setCouponCode, 
    appliedCoupon, 
    subTotal 
}) => {

    const handleApplyCoupon = () => {
        try {
            applyCoupon(couponCode);
        } catch (error) {
        }
    };

    return (
        <div className="coupon-section">
            <GiftIcon className="w-6 h-6 text-black" />
            Have a coupon?
            <label>
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                />
                <button
                    type="button"
                    onClick={handleApplyCoupon}
                >
                    Apply
                </button>
            </label>
        </div>
    );
};

export default CouponSection;
