import React, { useEffect } from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactInfo = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS with animation duration and one-time play
    }, []);

    return (
        <div className="contact-information">
            <div
                className="contact-card"
                data-aos="fade-right"
                data-aos-delay="0" // No delay for the first card
            >
                <div className="contact-icon">
                    <PhoneIcon className="w-6 h-6 text-black" />
                </div>
                <p>+234 567 8910</p>
            </div>

            <div
                className="contact-card"
                data-aos="fade-right"
                data-aos-delay="200" // Add a delay of 200ms
            >
                <div className="contact-icon">
                    <EnvelopeIcon className="w-6 h-6 text-black" />
                </div>
                <p>contact-heven@gmail.com</p>
            </div>

            <div
                className="contact-card"
                data-aos="fade-right"
                data-aos-delay="400" // Add a delay of 400ms
            >
                <div className="contact-icon">
                    <MapPinIcon className="w-6 h-6 text-black" />
                </div>
                <p>1234 Street, City</p>
            </div>
        </div>
    );
};

export default ContactInfo;