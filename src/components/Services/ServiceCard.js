import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getImageUrl } from '../../api';

const ServiceCard = ({ service }) => {
    const { setService } = useAuth()
    const isUrl = (path) => {
        try {
            const url = new URL(path);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    const imageUrl = service.image 
        ? (isUrl(service.image) 
            ? service.image 
            : getImageUrl(service.image))
        : null;

    return (
        <Link 
            to={`/service-details/${service._id}`} 
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            onClick={() => setService(service)}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100">
                {imageUrl ? (
                    <>
                        <img 
                            src={imageUrl} 
                            alt={service.name} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                            }}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-center font-bold text-lg text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                    {service.name}
                </h3>
            </div>
        </Link>
    )
}

export default ServiceCard
