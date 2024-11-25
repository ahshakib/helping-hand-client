import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EmployeeMiniCard from "../../components/Employees/EmployeeMiniCard";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const { services, employees } = useAuth()

  const isUrl = (path) => {
    try {
      const url = new URL(path);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };
  const service = services.find((service) => service._id === id);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <h1 className="text-xl lg:text-3xl my-5 lg:my-10 font-bold text-pink-800">
          {service.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="w-full p-5 order-last lg:order-first bg-gray-50 shadow-md rounded">
            {
              service.image ? (
                <img src={
                  isUrl(service.image) ? service.image : `http://localhost:5000${service.image}`
                } alt={service.name} className="w-full object-cover rounded mx-auto shadow-md" />
              ) : ('No Image')
            }
            <h2 className="font-bold text-xl mt-10 py-2 text-pink-800">{service.name}</h2>
            <p className="text-justify">{service.details}</p>
          </div>
          <div className="bg-gray-50 p-5 shadow-md rounded">
            <h2 className="font-bold text-pink-800 text-xl">Service Provider</h2>
            <div className="grid grid-flow-col lg:grid-cols-2 gap-5 mt-5">
              {employees
                .filter((employee) => employee.services.includes(service.name)).length > 0 ?
                (employees
                  .filter((employee) => employee.services.includes(service.name))
                  .map((employee) => (
                    <EmployeeMiniCard key={employee._id} employee={employee} />
                  ))) :
                (<p className="text-gray-700" style={{ fontStyle: 'italic' }}>No Service Provider</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
