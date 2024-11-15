import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BreadCrumb = ({ name, image }) => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Set the default animation duration
    }, []);

    return (
        <div className="bread-crumb">
            <img src={image} alt="hero poster" />
            <div className="overlay"></div> 
            <div className="breadcrumb-content">
                <h2 data-aos="fade-right">{name}</h2>
            </div>
        </div>
    )
};

export default BreadCrumb;