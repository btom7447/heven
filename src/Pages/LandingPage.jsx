import React, { useState, useEffect } from "react";
import Airtable from 'airtable';
import CategoryGrid from "../Components/CategoryGrid";
import FeaturedProducts from "../Components/FeaturedProducts";
import NewsLetter from "../Components/NewsLetter";
import HeroSection from "../Components/HeroSection";
import TestimonialSection from "../Components/TestimonialSection";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true); 
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        setLoadingProducts(true);
        base("Products")
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedProducts = records.map(record => ({
                    id: record.product_id,
                    name: record.fields.product_name,
                    price: record.fields.price,
                    description: record.fields.product_description,
                    quantity: record.fields.stock_quantity,
                    categories: record.fields.product_category_name || [],
                    gender: record.fields.gender || [],
                    featured: record.fields.featured_product,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : []
                }));

                setProducts(fetchedProducts);
                setLoadingProducts(false); // Stop loading after products are fetched
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoadingProducts(false); // Stop loading in case of an error
            });
    }, []);

    useEffect(() => {
        setLoadingCategories(true);
        base("Categories")
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedCategories = records.map(record => ({
                    id: record.id,
                    name: record.fields.category_name,
                    description: record.fields.category_description,
                    products: record.fields.category_products || [],
                    star: record.fields.category_star || [],
                    image: record.fields.star_image ? record.fields.star_image.map(img => img.url) : []
                }));
    
                setCategories(fetchedCategories);
                setLoadingCategories(false); // Stop loading after categories are fetched
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setLoadingCategories(false); // Stop loading in case of an error
            });
    }, []);

    useEffect(() => {
        setLoadingReviews(true);
        base("Reviews")
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedReviews = records.map(record => ({
                    id: record.review_id,
                    name: record.fields.customer_name,
                    text: record.fields.review_text,
                    products: record.fields.reivew_products || [],
                    rating: record.fields.product_rating,
                    date: record.fields.review_date,
                }));
    
                setReviews(fetchedReviews);
                setLoadingReviews(false); // Stop loading after categories are fetched
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoadingReviews(false); // Stop loading in case of an error
            });
    }, []);

    return (
        <div className="page">
            <HeroSection />
            <CategoryGrid categories={categories} loading={loadingCategories} />
            <FeaturedProducts products={products} loading={loadingProducts} />
            <NewsLetter />
            <TestimonialSection reviews={reviews} loading={loadingReviews} />
            
        </div>
    );
};

export default LandingPage;