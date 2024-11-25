import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        content: "",
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { name, phone, email, content } = formData;
        if (!name || !phone || !email || !content) {
            toast.error("Please fill out all fields!");
            return;
        }
        
        // Logic for form submission can go here (e.g., API call)
        toast.success("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", content: "" }); // Reset form
    };

    return (
        <form
            className="contact-form"
            data-aos="fade-left" 
            onSubmit={handleSubmit}
        >
            <h5>Send us a message</h5>

            {/* Name Input */}
            <label htmlFor="name">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    required
                />
            </label>
            {/* Phone Input */}
            <label htmlFor="phone">
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Number*"
                    required
                />
            </label>
            {/* Email Input */}
            <label htmlFor="email">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    required
                />
            </label>
            {/* Content Input */}
            <label htmlFor="content">
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Message*"
                    rows="5"
                    required
                ></textarea>
            </label>
            {/* Submit Button */}
            <button type="submit" className="btn-submit">
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;