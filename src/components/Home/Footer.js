import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading mb-6 bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                            Helping Hand
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Your trusted partner for all home and personal services. We connect you with verified professionals to make your life easier.
                        </p>
                        {/* Social Media */}
                        <div className="flex space-x-4 pt-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-xl">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-xl">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-xl">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-xl">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-accent-400 transition-colors">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/employees" className="text-gray-400 hover:text-accent-400 transition-colors">
                                    Our Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-400 hover:text-accent-400 transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-400 hover:text-accent-400 transition-colors">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6">Popular Services</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-accent-400 transition-colors cursor-pointer">Home Cleaning</li>
                            <li className="hover:text-accent-400 transition-colors cursor-pointer">AC Repair</li>
                            <li className="hover:text-accent-400 transition-colors cursor-pointer">Plumbing</li>
                            <li className="hover:text-accent-400 transition-colors cursor-pointer">Electrical Work</li>
                            <li className="hover:text-accent-400 transition-colors cursor-pointer">Car Washing</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <FaMapMarkerAlt className="text-accent-400 mt-1 flex-shrink-0" />
                                <span>123 Service Street, City, Country</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaPhone className="text-accent-400 flex-shrink-0" />
                                <span>+1 234 567 8900</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaEnvelope className="text-accent-400 flex-shrink-0" />
                                <span>support@helpinghand.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Helping Hand. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="/privacy-policy" className="text-gray-400 hover:text-accent-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms-of-service" className="text-gray-400 hover:text-accent-400 transition-colors">
                                Terms of Service
                            </a>
                            <a href="/cookie-policy" className="text-gray-400 hover:text-accent-400 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
