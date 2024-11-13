import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { BounceLoader } from "react-spinners"; 

const CategoryGrid = ({ categories, loading

 }) => {
    // Reorder categories to ensure "New Arrival" is the first item
    const sortedCategories = [
        ...categories.filter(category => category.name === "New Arrival"),
        ...categories.filter(category => category.name !== "New Arrival")
    ];

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, // To trigger the animation only once
            easing: 'ease-in-out', // Smooth easing for better effect
        });
    }, []);

    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <BounceLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    return (
        <div className="category-grid">
            {sortedCategories.map((category, index) => (
                <div
                    key={category.id}
                    className="category-item"
                    data-aos={index === 0 ? "fade-right" : "zoom-out"} // Conditional AOS animation
                >
                    <img 
                        src={category.image[0] || ""} 
                        alt={category.name}
                        className="category-image"
                    />
                    <button className="category-content">
                        {category.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
