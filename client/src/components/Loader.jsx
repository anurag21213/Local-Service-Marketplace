import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = ({ message = 'Loading...', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center">
                <div className={`${sizeClasses[size]} text-blue-600 animate-spin mb-4`}>
                    <FontAwesomeIcon icon={faSpinner} className="w-full h-full" />
                </div>
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    );
};

export default Loader; 