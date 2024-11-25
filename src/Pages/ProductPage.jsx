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
    const [categoryFilter, setCategoryFilter] = useState(""); // For category filtering
    const [nameFilter, setNameFilter] = useState(""); // For name filtering

    // Fetch products from Airtable
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

    // Dynamically filter products whenever filters change
    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesCategory = categoryFilter ? product.categories.includes(categoryFilter) : true;
            const matchesName = nameFilter ? product.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            return matchesCategory && matchesName;
        });
        setFilteredProducts(filtered);
    }, [products, categoryFilter, nameFilter]); // Run this filter logic whenever products, categoryFilter, or nameFilter change

    // Handle filter changes
    const handleFilterChange = ({ category, name }) => {
        setCategoryFilter(category); // Update category filter
        setNameFilter(name); // Update name filter
    };

    return (
        <div className="product-page">
            <BreadCrumb name="Products" image={image} />
            <div className="product-container">
                <ProductFilter
                    onFilterChange={handleFilterChange}
                    categories={categoryOptions}
                />
                <ProductGrid products={filteredProducts} loading={loadingProducts} />
            </div>
        </div>
    );
};

export default ProductPage;