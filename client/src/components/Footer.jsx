import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-12">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Local Service Market
                        </h2>
                        <p className="text-gray-600">
                            Connecting skilled professionals with those in need of quality services.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Plumbing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Electrical
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Cleaning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    Moving
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mt-1 mr-3" />
                                <span className="text-gray-600">123 Service Street, City, Country</span>
                            </li>
                            <li className="flex items-start">
                                <FontAwesomeIcon icon={faPhone} className="text-blue-600 mt-1 mr-3" />
                                <span className="text-gray-600">+1 234 567 890</span>
                            </li>
                            <li className="flex items-start">
                                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 mt-1 mr-3" />
                                <span className="text-gray-600">info@servicehub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} ServiceHub. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
