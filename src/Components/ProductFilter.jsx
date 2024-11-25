import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

const ProductFilter = ({ onFilterChange, categories }) => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [isNameOpen, setIsNameOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

    const checkWindowWidth = () => {
        if (window.innerWidth <= 425) {
            setIsNameOpen(false);
            setIsCategoriesOpen(false);
        } else {
            setIsNameOpen(true);
            setIsCategoriesOpen(true);
        }
    };

    useEffect(() => {
        checkWindowWidth();
        window.addEventListener("resize", checkWindowWidth);
        return () => window.removeEventListener("resize", checkWindowWidth);
    }, []);

    const handleCategoryClick = (cat) => {
        const selectedCategory = cat === category ? "" : cat; // Toggle category
        setCategory(selectedCategory);
        onFilterChange({ category: selectedCategory, name });
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        onFilterChange({ category, name: newName });
    };

    const toggleAccordion = (section) => {
        if (section === "name") setIsNameOpen(!isNameOpen);
        else if (section === "categories") setIsCategoriesOpen(!isCategoriesOpen);
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
        </div>
    );
};

export default ProductFilter;
