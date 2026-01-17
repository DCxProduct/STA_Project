"use client"; // only needed if using in client component

import React from "react";
import { FaFacebookF, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

// Expecting full URL in `link` prop and title, id, locale if needed
const Social = ({ link, title }) => {
  
    return (
    <div className="flex lg:items-center basis-full khmer-text-batr lg:justify-end gap-1 lg:gap-3 mt-10">
        
        {/* Facebook */}
        <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${link}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center sm:gap-2 xs:gap-1 bg-blueDefault hover:bg-buttonBlue text-white px-2 py-0 rounded md:text-size-13 xs:text-size-12"
        >
            <FaFacebookF size={14} />
            <span>Facebook</span>
            </a>
        
        {/* Telegram */}
        <a
        href={`https://t.me/share/url?url=${encodeURIComponent(`${link}`)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center sm:gap-2 xs:gap-1 bg-sky-500 hover:bg-sky-400 text-white px-2 py-0 rounded md:text-size-13 xs:text-size-12"
        >
            <FaTelegramPlane size={14} />
            <span>Telegram</span>
        </a>

        {/* Twitter */}
        <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${link}`)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center sm:gap-2 xs:gap-1 bg-gray-800 hover:bg-gray-600 text-white px-2 py-0 rounded md:text-size-13 xs:text-size-12"
        >                
            <span className="font-bold text-size-15">𝕏</span>
            <span>Twitter</span>
        </a>
        
        {/* LinkedIn */}
        <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${link}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center sm:gap-2 xs:gap-1 bg-sky-600 hover:bg-sky-500 text-white px-2 py-0 rounded md:text-size-13 xs:text-size-12"
        >
            <FaLinkedinIn size={14} />
            <span>LinkedIn</span>
        </a>    
    </div>
  );
};

export default Social;

