import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
    const isUrl = (path) => {
        try {
            const url = new URL(path);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };
    return (
        <Link to={`/service-details/${service._id}`} className="">
            {
                service.image ? (
                    <img src={
                        isUrl(service.image) ? service.image : `http://localhost:5000${service.image}`
                    } alt={service.name} className="w-60 object-cover rounded" />
                ) : ('No Image')
            }
            <h3 className="text-center w-3/4 mx-auto font-bold text-base mt-3">{service.name}</h3>
        </Link>
    )
}

export default ServiceCard
