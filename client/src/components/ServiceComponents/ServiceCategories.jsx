import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWrench,
    faHammer,
    faBolt,
    faPaintRoller,
    faCar,
    faHome,
    faTools,
    faCogs,
    faTruck,
    faBuilding,
    faTrowel,
    faFan
} from '@fortawesome/free-solid-svg-icons';

const ServiceCategories = () => {
    const services = [
        {
            id: 1,
            title: 'Plumbing',
            icon: <FontAwesomeIcon icon={faWrench} className="text-5xl text-blue-600" />,
            description: 'Professional plumbing services for your home and business needs.',
            bgColor: 'bg-blue-50',
            hoverColor: 'hover:bg-blue-100',
        },
        {
            id: 2,
            title: 'Carpentry',
            icon: <FontAwesomeIcon icon={faHammer} className="text-5xl text-amber-600" />,
            description: 'Expert carpentry work for furniture, doors, and home improvements.',
            bgColor: 'bg-amber-50',
            hoverColor: 'hover:bg-amber-100',
        },
        {
            id: 3,
            title: 'Electrical',
            icon: <FontAwesomeIcon icon={faBolt} className="text-5xl text-yellow-600" />,
            description: 'Safe and reliable electrical services for all your power needs.',
            bgColor: 'bg-yellow-50',
            hoverColor: 'hover:bg-yellow-100',
        },
        {
            id: 4,
            title: 'Painting',
            icon: <FontAwesomeIcon icon={faPaintRoller} className="text-5xl text-red-600" />,
            description: 'Professional painting services for interior and exterior spaces.',
            bgColor: 'bg-red-50',
            hoverColor: 'hover:bg-red-100',
        },
        {
            id: 5,
            title: 'Automotive',
            icon: <FontAwesomeIcon icon={faCar} className="text-5xl text-green-600" />,
            description: 'Comprehensive automotive repair and maintenance services.',
            bgColor: 'bg-green-50',
            hoverColor: 'hover:bg-green-100',
        },
        {
            id: 6,
            title: 'Home Maintenance',
            icon: <FontAwesomeIcon icon={faHome} className="text-5xl text-purple-600" />,
            description: 'Complete home maintenance and repair solutions.',
            bgColor: 'bg-purple-50',
            hoverColor: 'hover:bg-purple-100',
        },
        {
            id: 7,
            title: 'HVAC',
            icon: <FontAwesomeIcon icon={faFan} className="text-5xl text-indigo-600" />,
            description: 'Heating, ventilation, and air conditioning services.',
            bgColor: 'bg-indigo-50',
            hoverColor: 'hover:bg-indigo-100',
        },
        {
            id: 8,
            title: 'Construction',
            icon: <FontAwesomeIcon icon={faBuilding} className="text-5xl text-orange-600" />,
            description: 'Professional construction and renovation services.',
            bgColor: 'bg-orange-50',
            hoverColor: 'hover:bg-orange-100',
        },
        {
            id: 9,
            title: 'Masonry',
            icon: <FontAwesomeIcon icon={faTrowel} className="text-5xl text-gray-600" />,
            description: 'Expert masonry and stonework services.',
            bgColor: 'bg-gray-50',
            hoverColor: 'hover:bg-gray-100',
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our wide range of professional services tailored to meet your needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`${service.bgColor} ${service.hoverColor} rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300`}
                        >
                            <div className="flex items-center justify-center mb-6">
                                <div className="p-4 rounded-full bg-white shadow-md">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">{service.title}</h3>
                            <p className="text-gray-600 text-center mb-6">{service.description}</p>
                            <Link to={`/service/${service.title.toLowerCase()}`}>
                                <button className="w-full py-3 px-6 rounded-lg bg-white text-gray-800 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceCategories; 