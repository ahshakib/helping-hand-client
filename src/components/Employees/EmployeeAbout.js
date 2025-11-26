import { FaClock, FaInfoCircle, FaLayerGroup, FaMapMarkerAlt, FaMoneyBillWave, FaTools } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const EmployeeAbout = ({ employee }) => {
  const { slots, services } = useAuth()

  const categories = employee.services.map(serviceName => (services.find(service => service.name === serviceName) || {}).category) || "No category";
  const uniqueCategories = [...new Set(categories)];

  const timeFormatter = (time) => {
    const [hours, minutes] = time.split(":");
    return hours < 12
      ? `${hours}:${minutes} AM`
      : `${hours % 12 || 12}:${minutes} PM`;
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Policies & Slots */}
        <div className="lg:col-span-1 space-y-6">
          {/* Policies Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-3">
                <FaInfoCircle className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold font-heading text-gray-800">Policies</h2>
            </div>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <FaMapMarkerAlt className="text-accent-500 text-lg mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-sm text-gray-800 font-medium">{employee.location}</p>
                </div>
              </div>

              {/* Service Rate */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <FaMoneyBillWave className="text-primary-500 text-lg mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service Rate</p>
                  <p className="text-lg text-primary-600 font-bold">
                    ৳{Number(employee.rate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Slots Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-3 rounded-xl mr-3">
                <FaClock className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold font-heading text-gray-800">Available Slots</h2>
            </div>

            <div className="space-y-2">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-100"
                  >
                    <span className="text-sm font-semibold text-gray-700">{slot.label}</span>
                    <span className="text-sm text-gray-600">
                      {timeFormatter(slot.start_time)} - {timeFormatter(slot.end_time)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4 text-sm">No slots available</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold font-heading text-gray-800 mb-4">About the Professional</h3>
            <p className="text-gray-600 leading-relaxed text-justify">{employee.details}</p>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 p-2.5 rounded-lg mr-3">
                <FaLayerGroup className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-800">Service Categories</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.length > 0 ? (
                uniqueCategories.map(category => (
                  <span 
                    key={category} 
                    className="bg-gradient-to-r from-secondary-50 to-secondary-100 border border-secondary-200 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No categories available</p>
              )}
            </div>
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2.5 rounded-lg mr-3">
                <FaTools className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-800">Specialized Services</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {employee.services.length > 0 ? (
                employee.services.map(service => (
                  <span 
                    key={service} 
                    className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No services listed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAbout;
