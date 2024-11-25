import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { BounceLoader } from "react-spinners";

const CategoryGrid = ({ categories, loading }) => {
    const sortedCategories = [
        ...categories.filter(category => category.name === "New Arrival"),
        ...categories.filter(category => category.name !== "New Arrival"),
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    if (loading) {
        return (
            <div
                className="loading-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
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
                    data-aos={index === 0 ? "fade-right" : "zoom-out"}
                >
                    <img
                        src={category.image[0] || ""}
                        alt={category.name}
                        className="category-image"
                    />
                    <Link
                        to={`/products?category=${encodeURIComponent(category.name)}`} // Pass category in the URL
                        className="category-content"
                    >
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
