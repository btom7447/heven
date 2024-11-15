import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Set the default animation duration
    }, []);

    return (
        <div className="hero-section">
            <div className="hero-image-container">
                <img src={require('../Assets/Images/hero-image.jpg')} alt="hero poster" />
            </div>
            <div className="caption">
                <h1 data-aos="fade-right">Nourish your Skin</h1>
                <h5 data-aos="fade-up" data-aos-delay="300">
                    Indulge in the best selfcare essentials for a radiant, healthy glow
                </h5>
            </div>
        </div>
    );
};

export default HeroSection;