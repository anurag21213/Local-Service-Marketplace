import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../store/slices/authSlice';

const ProviderProfileModal = ({ provider, onClose, onBookNow ,providerid,showPay}) => {
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);

    const handleBookNow = async (providerId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/book`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceProviderId: providerId,
                    serviceLocation: user.servicePinCode
                })
            });

            if (!response.ok) {
                throw new Error('Failed to book now');
            }
            const data = await response.json();
            console.log(data);
            toast.success('Booking successful!');
        } catch (error) {
            toast.error('Failed to book now');
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="relative">
                    <img
                        src={provider.profileImage || 'https://via.placeholder.com/300'}
                        alt={provider.name}
                        className="w-full h-72 object-cover rounded-t-xl"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        <i className="fas fa-times text-gray-600"></i>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32">
                        <div className="absolute bottom-4 left-4 right-4">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {provider.name}
                            </h2>
                            <div className="flex items-center">
                                <div className="flex items-center mr-4">
                                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                                    <span className="text-white font-medium">{provider.rating || '4.5'}</span>
                                    <span className="text-gray-200 ml-1">({provider.reviews || '0'} reviews)</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${provider?.isAvailable
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {provider?.isAvailable ? 'Available' : 'Not Available'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-2xl font-bold text-blue-600">
                            ₹{provider.hourlyRate || '500'}/hr
                        </div>
                        {
                            showPay?<button
                            onClick={() => handleBookNow(providerid)}
                            className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Pay Now
                        </button>:<button
                            onClick={() => handleBookNow(providerid)}
                            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Book Now
                        </button>
                        }
                        
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                            About
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{provider.bio || 'No description available'}</p>
                    </div>

                    {/* Services and Certifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <i className="fas fa-tools text-blue-500 mr-2"></i>
                                Services Offered
                            </h3>
                            <ul className="space-y-3">
                                {provider.services?.map((service, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                        <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                        {service}
                                    </li>
                                )) || <li className="text-gray-500">No services listed</li>}
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <i className="fas fa-certificate text-blue-500 mr-2"></i>
                                Certifications
                            </h3>
                            <ul className="space-y-3">
                                {provider.certifications?.map((cert, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                        <i className="fas fa-award text-blue-500 mr-3"></i>
                                        {cert}
                                    </li>
                                )) || <li className="text-gray-500">No certifications listed</li>}
                            </ul>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-map-marker-alt text-blue-500 text-xl mr-3"></i>
                                <div>
                                    <p className="font-medium text-gray-800">Location</p>
                                    <p>{provider.location || 'Location not specified'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-clock text-blue-500 text-xl mr-3"></i>
                                <div>
                                    <p className="font-medium text-gray-800">Response Time</p>
                                    <p>{provider.responseTime || 'Within 24 hours'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-language text-blue-500 text-xl mr-3"></i>
                                <div>
                                    <p className="font-medium text-gray-800">Languages</p>
                                    <p>{provider.languages?.join(', ') || 'English'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfileModal; 