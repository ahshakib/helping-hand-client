import { FaClock, FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";

function Features() {
    const features = [
        {
            icon: <FaClock className="text-5xl text-accent-400" />,
            title: "24/7 Availability",
            description: "Access our services anytime, anywhere. We're always here when you need us."
        },
        {
            icon: <FaShieldAlt className="text-5xl text-accent-400" />,
            title: "Trusted & Verified",
            description: "All our service providers are thoroughly vetted and background-checked."
        },
        {
            icon: <FaUsers className="text-5xl text-accent-400" />,
            title: "Expert Professionals",
            description: "Skilled professionals with years of experience in their respective fields."
        },
        {
            icon: <FaStar className="text-5xl text-accent-400" />,
            title: "Quality Guaranteed",
            description: "We ensure top-notch service quality with every booking you make."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-800 mb-4">
                        Why Choose <span className="gradient-text">Helping Hand</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the best-in-class service with our dedicated team of professionals
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
