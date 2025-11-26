import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import EmployeeMiniCard from "../../components/Employees/EmployeeMiniCard";
import Footer from "../../components/Home/Footer";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const { service, employees, setService, user } = useAuth();

  useEffect(() => {
    if (!service.name) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/service/${id}`);
          const result = await response.json();
          if (result.status) {
            setService(result.service);
          } else {
            setService({});
          }
        } catch (error) {
          fetchData();
        }
      };
      fetchData();
    }
  }, [service.name, id, setService]);

  const isUrl = (path) => {
    try {
      const url = new URL(path);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 py-12 mb-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/services" 
            className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-white animate-fade-in">
            {service.name || "Service Details"}
          </h1>
        </div>
      </div>

      {/* Service Details Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-slide-up order-last lg:order-first">
            {service.image ? (
              <div className="mb-6">
                <img
                  src={
                    isUrl(service.image)
                      ? service.image
                      : `http://localhost:5000${service.image}`
                  }
                  alt={service.name}
                  className="w-full h-80 object-cover rounded-xl shadow-md"
                />
              </div>
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
            <h2 className="text-2xl font-bold font-heading text-gray-800 mb-4">
              About This Service
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              {service.details || "No details available"}
            </p>
          </div>

          {/* Service Providers Card */}
          {(user.role === "user" || !user.role) && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-slide-up delay-200">
              <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">
                Available Service Providers
              </h2>
              <div className="space-y-4">
                {employees.filter((employee) =>
                  employee.services.includes(service.name)
                ).length > 0 ? (
                  employees
                    .filter((employee) =>
                      employee.services.includes(service.name)
                    )
                    .map((employee) => (
                      <EmployeeMiniCard
                        key={employee._id}
                        employee={employee}
                      />
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 italic text-lg">
                      No service providers available at this time
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
