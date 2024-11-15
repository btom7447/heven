import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React from "react";
import {  } from "react-icons/fa";

const NewsLetter = () => {
    return (
        <div className="newsletter-section">
            <h2>News Letter</h2>
            <p>Sign up to receive information about new products</p>
            
            <label htmlFor="newsletter">
                <input 
                    type="email" 
                    name="newsletter" 
                    id="newsletter" 
                    placeholder="Subscribe ..."
                />
                <PaperAirplaneIcon className="w-6 h-6 text-black news-icon" />
            </label>
        </div>
    )
};

export default NewsLetter;