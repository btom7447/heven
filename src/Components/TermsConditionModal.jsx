import React from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';

const TermsConditionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-black" />
                </button>
                <h2>Terms & Conditions</h2>
                <p>
                    This is where your terms and conditions text will go. Provide details about 
                    your policies for using the site or services.
                </p>
            </div>
        </div>
    );
};

export default TermsConditionModal;
