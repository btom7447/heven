import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'; 
import { BounceLoader } from "react-spinners"; 

const HeroSlide = ({ products, loading }) => {
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
        <Splide 
            className="home-carousel"
            options={{ 
                perPage: 1, 
                pagination: false, 
                arrows: true, 
                autoplay: true, 
                type: "loop", 
                heightRatio: 0.5, 
                cover: true, 
                interval: 3000,
                speed: 1000, 
                easing: 'ease',
            }}>
            {filteredProducts.map((product) => (
                <SplideSlide key={product.id}>
                    <div className="hero-slide">
                        <img src={product.image[0]} alt={product.name} />
                        <div className="slide-caption">
                            <h3>{product.name}</h3>
                        </div>
                    </div>
                </SplideSlide>
            ))}
        </Splide>
    );
};

export default HeroSlide;