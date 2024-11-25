import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import image from "../Assets/Images/contact-breadcrumb.jpg";
import ContactInfo from "../Components/ContactInfo";
import ContactForm from "../Components/ContactForm";
import ContactMap from "../Components/ContactMap";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <BreadCrumb name="Contact Us" image={image} />
            <div className="contact-container">
                <ContactInfo />
                <ContactForm />
            </div>
            <ContactMap />
        </div>
    )
};

export default ContactPage;