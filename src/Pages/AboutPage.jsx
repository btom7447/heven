import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import image from "../Assets/Images/about-breadcrumb.jpg";
import TestimonialSection from "../Components/TestimonialSection";
import NewsLetter from "../Components/NewsLetter";
import StorySection from "../Components/StorySection";

const AboutPage = () => {
    return (
        <div className="about-page">
            <BreadCrumb name="About Heven" image={image} />
            <StorySection />
            <TestimonialSection />
            <NewsLetter />
        </div>
    )
};

export default AboutPage;