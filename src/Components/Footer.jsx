import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookSquare } from 'react-icons/fa';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import whiteLogo from "../Assets/Images/heven-logo-1.png";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsConditionModal from "./TermsConditionModal";

const Footer = () => {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTermsCondition, setShowTermsCondition] = useState(false);

    return (
        <footer>
            <div className="footer-tabs">
                <div className="tab">
                    <img src={whiteLogo} alt="heven store logos" className="footer-logo" />
                    <ul>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/order-shipping">Order & Shipping</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact us</Link>
                        </li>
                    </ul>
                </div>
                <div className="tab">
                    <h4>Follow Us</h4>
                    <p>Join the Conversation on Social Media</p>
                    <div className="footer-socials">
                        <a href="https://www.instagram.com/heven_selfcare?igsh=MTF2OGRqdGszczJhdQ==" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="h-6 w-6 text-gray-800" />
                        </a>
                        <a href="https://www.facebook.com/share/15JuWVHskW/?mibextid=LQQJ4d" target='_blank' rel="noreferrer">
                            <FaFacebookSquare className="h-6 w-6 text-gray-800" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="h-6 w-6 text-gray-800" />
                        </a>
                    </div>
                </div>
                <div className="tab">
                    <h4>Subscribe to our Newsletter</h4>
                    <p>Be the first to know about our new arrivals and exclusive offers</p>
                    <label htmlFor="newsletter">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email address"
                        />
                        <button type="button">
                            <PaperAirplaneIcon className="h-6 w-6 text-gray-800" />
                        </button>
                    </label>
                </div>
            </div>
            <div className="footer-terms">
                <div className="privacy">
                    <button onClick={() => setShowPrivacyPolicy(true)}>Privacy & Policy</button>
                    <button onClick={() => setShowTermsCondition(true)}>Terms & Conditions</button>
                </div>
                <div className="copyright">
                    <p>©2023 Heven</p>
                </div>
            </div>

            {/* Modals */}
            <PrivacyPolicyModal 
                isOpen={showPrivacyPolicy} 
                onClose={() => setShowPrivacyPolicy(false)} 
            />
            <TermsConditionModal 
                isOpen={showTermsCondition} 
                onClose={() => setShowTermsCondition(false)} 
            />
        </footer>
    );
};

export default Footer;