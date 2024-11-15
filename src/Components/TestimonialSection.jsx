import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import BounceLoader from "react-spinners/BounceLoader";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const TestimonialSection = ({ reviews, loading }) => { 
    if (loading) {
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