import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServiceDisplay = () => {
    const { serviceType } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for service providers
    const serviceProviders = [
        {
            id: 1,
            name: 'John Plumbing Services',
            rating: 4.8,
            reviews: 120,
            experience: '5 years',
            price: '$50/hr',
            available: true,
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Professional plumbing services with 5 years of experience. Specialized in residential and commercial plumbing solutions.',
            services: ['Pipe Installation', 'Leak Repair', 'Water Heater Installation', 'Drain Cleaning'],
            certifications: ['Licensed Plumber', 'Certified Pipe Fitter'],
            location: 'New York, NY',
            responseTime: 'Within 2 hours',
            languages: ['English', 'Spanish'],
            portfolio: [
                'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            ],
        },
        {
            id: 2,
            name: 'Mike\'s Plumbing Solutions',
            rating: 4.5,
            reviews: 85,
            experience: '3 years',
            price: '$45/hr',
            available: false,
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        },
        {
            id: 3,
            name: 'Quick Fix Plumbing',
            rating: 4.9,
            reviews: 200,
            experience: '8 years',
            price: '$60/hr',
            available: true,
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        },
        // Add more mock data as needed
    ];

    const filteredProviders = serviceProviders.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openProviderModal = (provider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProvider(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {serviceType ? `${serviceType} Service Providers` : 'All Service Providers'}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find the best service providers in your area. Compare ratings, reviews, and availability.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search service providers..."
                            className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>

                {/* Service Provider Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProviders.map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Provider Image */}
                            <div className="relative h-48">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Availability Badge */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${provider.available
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {provider.available ? 'Available' : 'Not Available'}
                                </div>
                            </div>

                            {/* Provider Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {provider.name}
                                </h3>

                                {/* Rating and Reviews */}
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                                        <span className="text-gray-700 font-medium">{provider.rating}</span>
                                    </div>
                                    <span className="text-gray-500 mx-2">•</span>
                                    <span className="text-gray-500">{provider.reviews} reviews</span>
                                </div>

                                {/* Experience and Price */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-briefcase mr-2"></i>
                                        <span>{provider.experience} experience</span>
                                    </div>
                                    <div className="text-lg font-semibold text-blue-600">
                                        {provider.price}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                        Book Now
                                    </button>
                                    <button
                                        onClick={() => openProviderModal(provider)}
                                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Provider Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="relative">
                            <img
                                src={selectedProvider.image}
                                alt={selectedProvider.name}
                                className="w-full h-72 object-cover rounded-t-xl"
                            />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                                <i className="fas fa-times text-gray-600"></i>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32">
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {selectedProvider.name}
                                    </h2>
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-4">
                                            <i className="fas fa-star text-yellow-400 mr-1"></i>
                                            <span className="text-white font-medium">{selectedProvider.rating}</span>
                                            <span className="text-gray-200 ml-1">({selectedProvider.reviews} reviews)</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${selectedProvider.available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {selectedProvider.available ? 'Available' : 'Not Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-2xl font-bold text-blue-600">
                                    {selectedProvider.price}
                                </div>
                                <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Book Now
                                </button>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                                    About
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{selectedProvider.description}</p>
                            </div>

                            {/* Services and Certifications */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-tools text-blue-500 mr-2"></i>
                                        Services Offered
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedProvider.services.map((service, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-certificate text-blue-500 mr-2"></i>
                                        Certifications
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedProvider.certifications.map((cert, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <i className="fas fa-award text-blue-500 mr-3"></i>
                                                {cert}
                                            </li>
                                        ))}
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
                                            <p>{selectedProvider.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-clock text-blue-500 text-xl mr-3"></i>
                                        <div>
                                            <p className="font-medium text-gray-800">Response Time</p>
                                            <p>{selectedProvider.responseTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-language text-blue-500 text-xl mr-3"></i>
                                        <div>
                                            <p className="font-medium text-gray-800">Languages</p>
                                            <p>{selectedProvider.languages.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Portfolio */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <i className="fas fa-images text-blue-500 mr-2"></i>
                                    Portfolio
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedProvider.portfolio.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image}
                                                alt={`Portfolio ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ServiceDisplay;
