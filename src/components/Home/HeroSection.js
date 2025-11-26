import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <div className="relative flex items-center justify-center bg-hero-bg bg-center bg-no-repeat w-full min-h-[600px] bg-cover">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/70 to-purple-900/80"></div>
            
            {/* Content */}
            <div className="relative z-10 w-full px-4">
                <div className="text-center space-y-6">
                    {/* Main Heading with Animation */}
                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold font-heading animate-fade-in">
                        Your Personal Assistant
                    </h1>
                    
                    {/* Subheading with Animation */}
                    <h2 className="text-white/90 text-xl md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto animate-fade-in delay-200">
                        One stop solution for your services. Order any service anytime
                    </h2>
                    
                    {/* Search Bar */}
                    <div className="my-8 w-full xl:w-1/2 lg:w-2/3 md:w-3/4 mx-auto animate-slide-up delay-300">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            </div>
                            <input 
                                type="search" 
                                className="rounded-full w-full pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-primary-500/50 shadow-xl transition-all duration-300 text-gray-700 placeholder-gray-400"
                                placeholder="Find your services here e.g. AC, Car, Electrician..."
                            />
                        </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in delay-500">
                        <Link 
                            to="/services"
                            className="px-8 py-4 bg-gradient-to-r from-accent-400 to-accent-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Browse Services
                        </Link>
                        <Link 
                            to="/employees"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Meet Our Team
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    );
}

export default HeroSection;
