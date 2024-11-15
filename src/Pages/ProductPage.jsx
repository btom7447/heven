import React, { useEffect, useState } from "react";
import ProductFilter from "../Components/ProductFilter";
import ProductGrid from "../Components/ProductGrid";
import Airtable from "airtable";
import BreadCrumb from "../Components/BreadCrumb";
import image from "../Assets/Images/hero-image.jpg";

// Airtable base initialization
const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 0]);

    useEffect(() => {
        setLoadingProducts(true);
        base("Products")
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedProducts = records.map(record => ({
                    id: record.id,
                    name: record.fields.product_name,
                    price: record.fields.price,
                    discount: record.fields.discount,
                    description: record.fields.product_description,
                    quantity: record.fields.stock_quantity,
                    categories: record.fields.product_category_name || [],
                    gender: record.fields.gender || [],
                    featured: record.fields.featured_product,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : []
                }));

                // Get min and max price
                const prices = fetchedProducts.map(product => product.price);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));

                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts); // Initialize with all products

                // Extract unique categories
                const uniqueCategories = [...new Set(fetchedProducts.flatMap(product => product.categories))];
                setCategoryOptions(uniqueCategories);

                setLoadingProducts(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoadingProducts(false);
            });
    }, []);

    // Filter products by category, name, and price range
    const filterProducts = (filter) => {
        const filtered = products.filter(product => {
            const matchesCategory = filter.category ? product.categories.includes(filter.category) : true;
            const matchesName = filter.name ? product.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesCategory && matchesName && matchesPrice;
        });
        setFilteredProducts(filtered);
    };

    // Handle filter change and trigger filtering
    const handleFilterChange = (filter) => {
        filterProducts(filter);
    };

    // Handle price range change
    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);
        filterProducts({ category: "", name: "" }); // Trigger filter with updated price range
    };

    return (
        <div className="product-page">
            <BreadCrumb name="Products" image={image} />
            <div className="product-container">
                <ProductFilter
                    onFilterChange={handleFilterChange}
                    categories={categoryOptions}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onPriceRangeChange={handlePriceRangeChange}
                />
                <ProductGrid products={filteredProducts} loading={loadingProducts} />
            </div>
        </div>
    );
};

export default ProductPage;