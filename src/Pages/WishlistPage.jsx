import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import BreadCrumb from "../Components/BreadCrumb";
import image from "../Assets/Images/wishlist-breadcrumb.jpg";
import WishCard from "../Components/WishCard";
import NewsLetter from "../Components/NewsLetter";
import BounceLoader from "react-spinners/BounceLoader";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const WishlistPage = () => {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    useEffect(() => {
        // Fetch all products
        setLoadingProducts(true);
        base("Products")
            .select({ view: "Grid view" })
            .all()
            .then((records) => {
                const products = records.map((record) => ({
                    id: record.id,
                    name: record.fields.product_name,
                    price: record.fields.price,
                    discount: record.fields.discount || 0,
                    description: record.fields.product_description,
                    quantity: record.fields.stock_quantity,
                    categories: record.fields.product_category_name || [],
                    gender: record.fields.gender || [],
                    featured: record.fields.featured_product,
                    image: record.fields.images
                        ? record.fields.images.map((img) => img.url)
                        : [],
                }));
                setFetchedProducts(products);
                setLoadingProducts(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoadingProducts(false);
            });
    }, []);

    useEffect(() => {
        // Fetch wishlist from sessionStorage
        const storedWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
        setLoadingWishlist(false);
    }, []);

    return (
        <div className="wishlist-page">
            <BreadCrumb name="Wishlist" image={image} />

            {loadingWishlist ? (
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
            ) : wishlist.length === 0 ? ( // Use wishlist instead of wishItems
                <div className="no-items-message">
                    <p
                        style={{
                            height: "30dvh",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        No Items in wishlist
                    </p>
                </div>
            ) : (
                // Display wishlist items
                <div className="wish-grid">
                    {wishlist.map((product) => ( // Use wishlist instead of wishItems
                        <WishCard
                            key={product.id}
                            product={product}
                            loading={false}
                            setWishlist={setWishlist} // Pass setWishlist to update the wishlist dynamically
                        />
                    ))}
                </div>
            )}

            <NewsLetter />
        </div>
    );
};

export default WishlistPage;