import React from "react";
import firstPoster from "../Assets/Images/story-poster (1).jpg";
import secondPoster from "../Assets/Images/story-poster (2).jpg";

const StorySection = () => {
    return (
        <div className="story-section">
            <div className="story-item">
                <h2>Our Story</h2>
                <p>
                    HEVEN exists for you—the one who seeks to feel confident, glow and self-love. 
                </p>
                <p>
                    We are inspired by the belief that true beauty begins with self-love, HEVEN is created to empower you to embrace your glow and celebrate your uniqueness.
                </p>
                <p>
                    Every product is crafted with your well-being in mind, from our Best Selling Body Oils to our eco friendly formulations designed to elevate your self-care routine. HEVEN isn’t just about skincare; it’s about transforming daily practices into moments of Love, where you reconnect with your best self.
                </p>
                <p>
                    This is your journey to confidence. Your glow. Your HEVEN.
                </p>
                <span className="signature">Charles Faith</span>
            </div>
            <div className="poster-item right">
                <span className="x-axis"></span>
                <span className="y-axis"></span>
                <div className="story-poster ">
                    <img src={firstPoster} alt="heven story poster" />
                </div>  
            </div>
            <div className="poster-item left">
                <span className="x-axis"></span>
                <span className="y-axis"></span>
                <div className="story-poster left">
                    
                    <img src={secondPoster} alt="heven storyy poster" />
                </div>
            </div>
            <div className="story-item">
                {/* <h2>Who we are</h2> */}
                <p>
                    HEVEN is dedicated to helping her customers feel beautiful inside and out. 
                </p>
                <p>
                    Every product is crafted to support your healthy skin while uplifting your spirit. HEVEN believes self-care is essential to your overall well-being.
                </p>
            </div>
        </div>
    )
};

export default StorySection;