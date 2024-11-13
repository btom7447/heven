import React from "react";

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-image-container">
                <img src={require('../Assets/Images/hero-image.jpg')} alt="hero poster" />
            </div>
            <div className="caption">
                <h1>Nourish your Skin</h1>
                <h5>Indulge in the best selfcare essentials for a radiant, healthy glow</h5>
            </div>
        </div>
    );
};

export default HeroSection;