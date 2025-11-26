import Footer from "../../components/Home/Footer";
import Navbar from "../../components/Navbar";
import ServiceCard from "../../components/Services/ServiceCard";
import useAuth from "../../hooks/useAuth";

function Service() {
  const { services, categories } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 py-16 mb-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white text-center mb-4 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto animate-fade-in delay-200">
            Browse our wide range of professional services tailored to meet your needs
          </p>
        </div>
      </div>

      {/* Services by Category */}
      <div className="container mx-auto px-4 pb-16">
        {categories.map((category, categoryIndex) => (
          <div key={category._id} className="mb-20 animate-slide-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-2">
                {category.name}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services
                .filter((service) => service.category === category.name)
                .map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Service;
