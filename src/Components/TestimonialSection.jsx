import React, { useState, useEffect } from "react";
import Airtable from 'airtable';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import BounceLoader from "react-spinners/BounceLoader";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const TestimonialSection = () => { 

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        setLoadingReviews(true);
        base("Reviews")
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedReviews = records.map(record => ({
                    id: record.id, // Fixed: Use `record.id` for unique keys
                    name: record.fields.customer_name,
                    text: record.fields.review_text,
                    products: record.fields.reivew_products || [],
                    rating: record.fields.product_rating,
                    date: record.fields.review_date,
                }));
    
                setReviews(fetchedReviews);
                setLoadingReviews(false); // Stop loading after reviews are fetched
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoadingReviews(false); // Stop loading in case of an error
            });
    }, []);

    if (loadingReviews) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <BounceLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    return (
        <div className="testimonial-section">
            <h2>Testimonials</h2>
            <Splide
                className="featured-carousel"
                options={{
                    type: 'loop',
                    perPage: 1,
                    autoplay: true,
                    pagination: true,
                    arrows: false,
                    interval: 6000,
                }}
                aria-label="Testimonials"
            >
                {reviews?.map((review) => ( 
                    <SplideSlide key={review.id}>
                        <div className="testimonial-slide">
                            <h4><span className="fquote">"</span>{review.text}</h4>
                            <h5>{review.name}</h5>
                            <div className="testimonial-rating">
                                {/* Display Filled and Empty Stars */}
                                {[...Array(5)].map((_, index) => (
                                    index < review.rating ? (
                                        <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <StarOutlineIcon key={index} className="h-5 w-5 text-yellow-500" />
                                    )
                                ))}
                            </div>
                            <h4><span className="squote">"</span></h4>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default TestimonialSection;