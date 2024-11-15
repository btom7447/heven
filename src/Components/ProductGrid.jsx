import React from "react";
import ProductCard from "./ProductCard";
import BounceLoader from "react-spinners/BounceLoader"; 

const ProductGrid = ({ products, loading }) => {
    return (
        <div className="product-grid">
            {loading ? (
                <div
                    className="loading-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        marginLeft: '30dvw',
                        marginTop: '30dvh',
                    }}
                >
                    <BounceLoader size={80} color="#cfac9f" />
                </div>
            ) : products.length === 0 ? (
                <div
                    className="no-products"
                    style={{
                        height: '30dvh',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p>No products found</p>
                </div>
            ) : (
                products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductGrid;