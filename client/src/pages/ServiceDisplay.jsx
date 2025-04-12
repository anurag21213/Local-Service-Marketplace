import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProviderProfileModal from '../components/ProviderComponents/ProviderProfileModal';
import { toast } from 'react-toastify';

const ServiceDisplay = () => {
    const { service } = useParams();
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(service);


    // Mock data for service providers
    // const serviceProviders = [
    //     {
    //         id: 1,
    //         name: 'John Plumbing Services',
    //         rating: 4.8,
    //         reviews: 120,
    //         experience: '5 years',
    //         price: '$50/hr',
    //         available: true,
    //         image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //         description: 'Professional plumbing services with 5 years of experience. Specialized in residential and commercial plumbing solutions.',
    //         services: ['Pipe Installation', 'Leak Repair', 'Water Heater Installation', 'Drain Cleaning'],
    //         certifications: ['Licensed Plumber', 'Certified Pipe Fitter'],
    //         location: 'New York, NY',
    //         responseTime: 'Within 2 hours',
    //         languages: ['English', 'Spanish'],
    //         portfolio: [
    //             'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //         ],
    //     },
    //     {
    //         id: 2,
    //         name: 'Mike\'s Plumbing Solutions',
    //         rating: 4.5,
    //         reviews: 85,
    //         experience: '3 years',
    //         price: '$45/hr',
    //         available: false,
    //         image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //     },
    //     {
    //         id: 3,
    //         name: 'Quick Fix Plumbing',
    //         rating: 4.9,
    //         reviews: 200,
    //         experience: '8 years',
    //         price: '$60/hr',
    //         available: true,
    //         image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //     },
    //     // Add more mock data as needed
    // ];


    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/service-providers`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch service providers');
                }

                const data = await response.json();
                setServiceProviders(data.serviceProviders);
                console.log(serviceProviders);

            } catch (error) {
                console.error('Error fetching service providers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchServiceProviders();
        }
    }, [token]);

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

    const openProviderModal = (provider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProvider(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {service ? `${service} Service Providers` : 'All Service Providers'}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find the best service providers in your area. Compare ratings, reviews, and availability.
                    </p>
                </div>

                {/* Service Provider Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceProviders.map((provider) => (
                        <div
                            key={provider._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Provider Image */}
                            <div className="relative h-48">
                                <img
                                    src={provider.profileImage || 'https://via.placeholder.com/300'}
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Availability Badge */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${provider?.isAvailable
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {provider?.isAvailable ? 'Available' : 'Not Available'}
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
                                        <span className="text-gray-700 font-medium">{provider.rating || '4.5'}</span>
                                    </div>
                                    <span className="text-gray-500 mx-2">•</span>
                                    <span className="text-gray-500">{provider.reviews || '0'} reviews</span>
                                </div>

                                {/* Experience and Price */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-briefcase mr-2"></i>
                                        <span>{provider.experience || '2+'} years experience</span>
                                    </div>
                                    <div className="text-lg font-semibold text-blue-600">
                                        ₹{provider.hourlyRate || '500'}/hr
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleBookNow(provider._id)}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                    >
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
                            {/* Provider Profile Modal */}
                            {isModalOpen && selectedProvider && (
                                <ProviderProfileModal
                                    provider={selectedProvider}
                                    onClose={closeModal}
                                    onBookNow={handleBookNow}
                                    providerid={provider._id}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>



            <Footer />
        </div>
    );
};

export default ServiceDisplay;
