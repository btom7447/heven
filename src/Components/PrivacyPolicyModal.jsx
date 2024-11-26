import React from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-black" />                
                </button>
                <h2>Privacy Policy</h2>
                <p>
                    This is where your privacy policy text will go. You can add as much detail 
                    as necessary to describe your privacy practices.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;