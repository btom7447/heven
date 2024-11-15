import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

const ProductFilter = ({ onFilterChange, categories, maxPrice, onPriceRangeChange }) => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [isNameOpen, setIsNameOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [sliderValue, setSliderValue] = useState(maxPrice);

    const checkWindowWidth = () => {
        if (window.innerWidth <= 425) {
            setIsNameOpen(false);
            setIsCategoriesOpen(false);
            setIsPriceOpen(false);
        } else {
            setIsNameOpen(true);
            setIsCategoriesOpen(true);
            setIsPriceOpen(true);
        }
    };

    useEffect(() => {
        checkWindowWidth();
        window.addEventListener("resize", checkWindowWidth);
        return () => window.removeEventListener("resize", checkWindowWidth);
    }, []);

    const handleCategoryClick = (cat) => {
        const selectedCategory = cat === category ? "" : cat;
        setCategory(selectedCategory);
        onFilterChange({ category: selectedCategory, name });
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        onFilterChange({ category, name: newName });
    };

    // Handle max price change
    const handleMaxPriceChange = (e) => {
        const newMaxPrice = parseInt(e.target.value);
        setSliderValue(newMaxPrice);
        onPriceRangeChange([1, newMaxPrice]); // Update the range with min fixed at 1
    };

    const toggleAccordion = (section) => {
        if (section === "name") setIsNameOpen(!isNameOpen);
        else if (section === "categories") setIsCategoriesOpen(!isCategoriesOpen);
        else if (section === "prices") setIsPriceOpen(!isPriceOpen);
    };

    return (
        <div className="product-filter">
            <div className={`filter-box ${isNameOpen ? "open" : ""}`}>
                <div className="accordion-btn" onClick={() => toggleAccordion("name")}>
                    <h4>Name</h4>
                    <span>{isNameOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}</span>
                </div>
                {isNameOpen && (
                    <div className="accordion-content">
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Product Name ..."
                            className="name-input"
                        />
                    </div>
                )}
            </div>

            <div className={`filter-box ${isCategoriesOpen ? "open" : ""}`}>
                <div className="accordion-btn" onClick={() => toggleAccordion("categories")}>
                    <h4>Categories</h4>
                    <span>{isCategoriesOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}</span>
                </div>
                {isCategoriesOpen && (
                    <div className="accordion-content">
                        <ul>
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    className={`category-item ${category === cat ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className={`filter-box ${isPriceOpen ? "open" : ""}`}>
                <div className="accordion-btn" onClick={() => toggleAccordion("prices")}>
                    <h4>Max Price</h4>
                    <span>{isPriceOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}</span>
                </div>
                <div className="accordion-content">
                    {isPriceOpen && (
                        <div className="price-range-slider">
                            <input
                                type="range"
                                min="1"
                                max={maxPrice}
                                value={sliderValue}
                                onChange={handleMaxPriceChange}
                                className="price-slider"
                            />
                            <div className="range-value">
                                <span>₦ 1</span> - <span>₦ {sliderValue.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;