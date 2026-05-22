import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getImageUrl } from "../../api";

const EmployeeCard = ({ employee }) => {
    const navigate = useNavigate();
    const {setEmployee} = useAuth()
    
    const isUrl = (path) => {
        try {
            const url = new URL(path);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    const imageUrl = employee.image 
        ? (isUrl(employee.image) 
            ? employee.image 
            : getImageUrl(employee.image))
        : "https://via.placeholder.com/150";

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100">
            {/* Header with Image and Basic Info */}
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={imageUrl}
                    alt={employee.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                    }}
                    className="w-24 h-24 rounded-full border-4 border-primary-100 shadow-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold font-heading text-gray-800 mb-1 truncate">
                        {employee.name}
                    </h2>
                    <p className="text-gray-600 mb-2 line-clamp-2">{employee.bio}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                        <FaMapMarkerAlt className="mr-1 text-accent-500 flex-shrink-0" />
                        <span className="truncate">{employee.location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary-600">
                            ৳{Number(employee.rate).toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/service</span>
                    </div>
                </div>
            </div>

            {/* Details */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {employee.details}
            </p>

            {/* Services Tags */}
            <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                    {employee.services.length > 4 ? (
                        <>
                            {employee.services.slice(0, 4).map((service, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 text-primary-700 rounded-full px-3 py-1 text-xs font-medium"
                                >
                                    {service}
                                </span>
                            ))}
                            <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">
                                +{employee.services.length - 4} more
                            </span>
                        </>
                    ) : (
                        employee.services.map((service, index) => (
                            <span 
                                key={index} 
                                className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 text-primary-700 rounded-full px-3 py-1 text-xs font-medium"
                            >
                                {service}
                            </span>
                        ))
                    )}
                </div>
            </div>

            {/* Footer with Rating and Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-amber-50 rounded-full px-3 py-1">
                        <FaStar className="text-amber-400 mr-1" />
                        <span className="font-bold text-gray-800">4.9</span>
                    </div>
                    <span className="text-gray-500 text-sm">(120 reviews)</span>
                </div>
                <button 
                    onClick={() => {
                        setEmployee(employee);
                        navigate(`/employee-details/${employee._id}`);
                    }} 
                    className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;