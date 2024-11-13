import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'; 
import { BounceLoader } from "react-spinners"; 
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products, loading }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (!loading) {
            const featuredProducts = products.filter(product => product.featured === true);
            setFilteredProducts(featuredProducts);
        }
    }, [products, loading]);

    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <BounceLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    return (
        <div className="featured-products">
            <h2>Featured Products</h2>
            <Splide 
                className="featured-carousel"
                options={{ 
                    perPage: 3, 
                    gap: '30px',
                    pagination: true, 
                    arrows: true, 
                    autoplay: false, 
                    type: "slide", 
                    easing: 'ease',
                    breakpoints: {
                        1024: {
                            perPage: 2, 
                            gap: '30px',
                        },
                        768: {
                            perPage: 1,  
                            gap: '30px',
                        },
                    },
                }}>
                {filteredProducts.map((product) => (
                    <SplideSlide key={product.id}>
                        <ProductCard product={product} loading={loading} />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default FeaturedProducts;