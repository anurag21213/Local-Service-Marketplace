import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProviderProfileModal from '../components/ProviderComponents/ProviderProfileModal';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ServiceDisplay = () => {
    const { service } = useParams();
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPayBtn, setShowPayBtn] = useState(false);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
    const navigate = useNavigate();

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

    const sendEmail = async (paymentId) => {
        setIsEmailLoading(true);
        try {
            setTimeout(async () => {
                const sendEmail = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sendemail`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ razorpay_payment_id: paymentId })
                });
                const emaildata = await sendEmail.json();
                console.log(emaildata);

                if (emaildata.message === "Confirmation sent successfully") {
                    toast.success('Payment verified successfully!');
                    navigate('/home');
                }
            }, 1000);
        } catch (error) {
            toast.error('Failed to send confirmation email');
        } finally {
            setIsEmailLoading(false);
        }
    }

    const handleBookNow = async (e, providerId) => {
        e.preventDefault();
        try {
            if (!showPayBtn) {
                setIsBookingLoading(true);
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

                if (!response.ok) throw new Error('Failed to book now');

                const data = await response.json();
                if (data) {
                    setShowPayBtn(true);
                }
            } else {
                setIsPaymentLoading(true);
                const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/clProfile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const info = await resp.json();
                const bookingArray = info.user.bookings;
                const booking = bookingArray.find(
                    (b) => b.serviceProviderId === providerId && b.status === 'Confirmed'
                );

                if (!booking) return toast.error("Booking not confirmed yet");

                const orderResp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${booking._id}/pay`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ paymentMethod: 'Online' })
                });

                const order = await orderResp.json();

                const options = {
                    key: 'rzp_test_NNN6WHXU4wxjmS',
                    amount: order.order.amount,
                    currency: 'INR',
                    name: 'Local Service Marketplace',
                    description: 'Service Payment',
                    image: 'https://example.com/logo.png',
                    order_id: order.order.id,
                    handler: async function (response) {
                        try {
                            setIsVerifyingPayment(true);
                            const verifyResp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payments/verify`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            });

                            const verifyData = await verifyResp.json();
                            console.log(verifyData);

                            if (verifyData.status === 200 || verifyData.success) {
                                await sendEmail(response.razorpay_payment_id);
                            } else {
                                toast.error('Payment verification failed.');
                            }
                        } catch (err) {
                            toast.error('Error in verifying payment');
                        } finally {
                            setIsVerifyingPayment(false);
                        }
                    },
                    prefill: {
                        name: user.name || 'Customer',
                        email: user.email || 'user@example.com',
                        contact: user.phone || '9000090000'
                    },
                    notes: {
                        address: 'Local Service Pvt. Ltd.'
                    },
                    theme: {
                        color: '#3399cc'
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to process booking or payment');
        } finally {
            setIsBookingLoading(false);
            setIsPaymentLoading(false);
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
            {isVerifyingPayment && <Loader message="Verifying Payment..." />}
            {isEmailLoading && <Loader message="Sending Confirmation..." />}
            {isLoading && <Loader message="Loading Service Providers..." />}

            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {service ? `${service} Service Providers` : 'All Service Providers'}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find the best service providers in your area. Compare ratings, reviews, and availability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceProviders.map((provider) => (
                        <div
                            key={provider._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48">
                                <img
                                    src={provider.profileImage || 'https://via.placeholder.com/300'}
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${provider?.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {provider?.isAvailable ? 'Available' : 'Not Available'}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{provider.name}</h3>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                                        <span className="text-gray-700 font-medium">{provider.rating || '4.5'}</span>
                                    </div>
                                    <span className="text-gray-500 mx-2">•</span>
                                    <span className="text-gray-500">{provider.reviews || '0'} reviews</span>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <i className="fas fa-briefcase mr-2"></i>
                                        <span>{provider.experience || '2+'} years experience</span>
                                    </div>
                                    <div className="text-lg font-semibold text-blue-600">
                                        ₹{provider.price || '500'}/hr
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    {showPayBtn ? (
                                        <button
                                            onClick={(e) => handleBookNow(e, provider._id)}
                                            disabled={isPaymentLoading}
                                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isPaymentLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                'Pay Now'
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => handleBookNow(e, provider._id)}
                                            disabled={isBookingLoading}
                                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isBookingLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                    Booking...
                                                </div>
                                            ) : (
                                                'Book Now'
                                            )}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => openProviderModal(provider)}
                                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                            {isModalOpen && selectedProvider && (
                                <ProviderProfileModal
                                    provider={selectedProvider}
                                    onClose={closeModal}
                                    onBookNow={(e) => handleBookNow(e, provider._id)}
                                    providerid={provider._id}
                                    showPay={showPayBtn}
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
