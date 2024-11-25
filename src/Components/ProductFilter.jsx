import React, { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const ProductFilter = ({ onFilterChange, categories, activeCategory }) => {
    const [category, setCategory] = useState(activeCategory || "");
    const [name, setName] = useState("");
    const [isNameOpen, setIsNameOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

    useEffect(() => {
        setCategory(activeCategory); // Update category when activeCategory changes
    }, [activeCategory]);

    const handleCategoryClick = cat => {
        const selectedCategory = cat === category ? "" : cat;
        setCategory(selectedCategory);
        onFilterChange({ category: selectedCategory, name });
    };

    const handleNameChange = e => {
        const newName = e.target.value;
        setName(newName);
        onFilterChange({ category, name: newName });
    };

    return (
        <div className="product-filter">
            <div className={`filter-box ${isNameOpen ? "open" : ""}`}>
                <div className="accordion-btn" onClick={() => setIsNameOpen(!isNameOpen)}>
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
                        />
                    </div>
                )}
            </div>

            <div className={`filter-box ${isCategoriesOpen ? "open" : ""}`}>
                <div className="accordion-btn" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                    <h4>Categories</h4>
                    <span>{isCategoriesOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}</span>
                </div>
                {isCategoriesOpen && (
                    <div className="accordion-content">
                        <ul>
                            {categories.map(cat => (
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
