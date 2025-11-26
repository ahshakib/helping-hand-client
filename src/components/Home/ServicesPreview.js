import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function ServicesPreview() {
    const services = [
        {
            title: "Home Cleaning",
            description: "Professional cleaning services for your home with eco-friendly products",
            gradient: "from-blue-400 to-blue-600"
        },
        {
            title: "AC Repair",
            description: "Expert AC repair and maintenance services for all brands",
            gradient: "from-purple-400 to-purple-600"
        },
        {
            title: "Plumbing",
            description: "24/7 plumbing services for all your emergency and routine needs",
            gradient: "from-pink-400 to-pink-600"
        },
        {
            title: "Electrical Work",
            description: "Licensed electricians for safe and reliable electrical services",
            gradient: "from-indigo-400 to-indigo-600"
        },
        {
            title: "Car Washing",
            description: "Premium car washing and detailing services at your doorstep",
            gradient: "from-cyan-400 to-cyan-600"
        },
        {
            title: "Pest Control",
            description: "Effective pest control solutions to keep your space pest-free",
            gradient: "from-teal-400 to-teal-600"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-800 mb-4">
                        Popular <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our most requested services and book instantly
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                            
                            {/* Content */}
                            <div className="relative z-10 p-8 text-white">
                                <h3 className="text-2xl font-bold font-heading mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-white/90 mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More <FaArrowRight className="ml-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center animate-fade-in delay-500">
                    <Link 
                        to="/services"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        View All Services
                        <FaArrowRight className="ml-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ServicesPreview;
